const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Online Shop API"
    });
});

app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany({
        include: {
            category: true
        }
    });

    res.json(products);
});

app.get("/products/:id", async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: Number(req.params.id)
        },
        include: {
            category: true
        }
    });

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

app.get("/orders", async (req, res) => {
    const orders = await prisma.order.findMany({
        include: {
            items: true,
            user: true
        }
    });

    res.json(orders);
});

app.post("/orders", async (req, res) => {
    const { userId, items } = req.body;

    let totalPrice = 0;

    for (const item of items) {
        const product = await prisma.product.findUnique({
            where: { id: item.productId }
        });

        totalPrice += product.price * item.quantity;
    }

    const order = await prisma.order.create({
        data: {
            userId,
            totalPrice,
            status: "NEW",
            items: {
                create: await Promise.all(
                    items.map(async item => {
                        const product = await prisma.product.findUnique({
                            where: { id: item.productId }
                        });

                        return {
                            productId: item.productId,
                            quantity: item.quantity,
                            price: product.price
                        };
                    })
                )
            }
        },
        include: {
            items: true
        }
    });

    res.status(201).json(order);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
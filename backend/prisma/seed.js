const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    const electronics = await prisma.category.create({
        data: {
            name: 'Electronics'
        }
    });

    const books = await prisma.category.create({
        data: {
            name: 'Books'
        }
    });

    await prisma.product.createMany({
        data: [
            {
                name: 'Laptop',
                description: 'Gaming laptop',
                price: 3999,
                stock: 10,
                categoryId: electronics.id
            },
            {
                name: 'Mouse',
                description: 'Wireless mouse',
                price: 99,
                stock: 50,
                categoryId: electronics.id
            },
            {
                name: 'Database Systems',
                description: 'University textbook',
                price: 79,
                stock: 25,
                categoryId: books.id
            }
        ]
    });

    await prisma.user.create({
        data: {
            name: 'Admin',
            email: 'admin@test.com'
        }
    });

    console.log('Database seeded');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
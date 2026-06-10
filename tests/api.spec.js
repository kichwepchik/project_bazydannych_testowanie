const { test, expect, request } = require("@playwright/test");

const API_URL = "http://localhost:3000";

test("GET /products returns products", async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.get(`${API_URL}/products`);

    expect(response.ok()).toBeTruthy();

    const products = await response.json();

    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty("id");
    expect(products[0]).toHaveProperty("name");
    expect(products[0]).toHaveProperty("price");
});

test("GET /products/1 returns single product", async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.get(`${API_URL}/products/1`);

    expect(response.ok()).toBeTruthy();

    const product = await response.json();

    expect(product.id).toBe(1);
    expect(product).toHaveProperty("category");
});

test("POST /orders creates order", async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.post(`${API_URL}/orders`, {
        data: {
            userId: 1,
            items: [
                {
                    productId: 1,
                    quantity: 1
                }
            ]
        }
    });

    expect(response.status()).toBe(201);

    const order = await response.json();

    expect(order).toHaveProperty("id");
    expect(order.totalPrice).toBeGreaterThan(0);
    expect(order.items.length).toBe(1);
});

test("GET /orders returns orders", async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.get(`${API_URL}/orders`);

    expect(response.ok()).toBeTruthy();

    const orders = await response.json();

    expect(Array.isArray(orders)).toBeTruthy();
});
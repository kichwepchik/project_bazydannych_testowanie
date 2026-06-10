const { test, expect } = require("@playwright/test");

test("products are displayed", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toHaveText("Online Shop");
    await expect(page.locator(".product")).toHaveCount(3);
    await expect(page.getByRole("heading", { name: "Laptop" })).toBeVisible();
});

test("user can add product to cart", async ({ page }) => {
    await page.goto("/");

    await page.locator("button", { hasText: "Add to cart" }).first().click();

    await expect(page.locator("#cart")).toContainText("Laptop");
    await expect(page.locator("#cart")).toContainText("Quantity: 1");
});

test("user can create order", async ({ page }) => {
    await page.goto("/");

    await page.locator("button", { hasText: "Add to cart" }).first().click();
    await page.locator("#orderBtn").click();

    await expect(page.locator("#message")).toHaveText("Order created successfully");
    await expect(page.locator("#cart")).toContainText("Cart is empty");
});
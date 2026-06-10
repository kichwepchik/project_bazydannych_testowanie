const API_URL = "http://localhost:3000";

let cart = [];

async function loadProducts() {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();

    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";

    products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Category: ${product.category.name}</p>
      <p>Price: ${product.price} PLN</p>
      <p>Stock: ${product.stock}</p>
      <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
        Add to cart
      </button>
    `;

        productsContainer.appendChild(div);
    });
}

function addToCart(productId, name, price) {
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId,
            name,
            price,
            quantity: 1
        });
    }

    renderCart();
}

function renderCart() {
    const cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Cart is empty</p>";
        return;
    }

    cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
      <p>${item.name}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Price: ${item.price * item.quantity} PLN</p>
    `;

        cartContainer.appendChild(div);
    });
}

async function createOrder() {
    if (cart.length === 0) {
        document.getElementById("message").textContent = "Cart is empty";
        return;
    }

    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: 1,
            items: cart.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))
        })
    });

    if (response.ok) {
        cart = [];
        renderCart();
        document.getElementById("message").textContent = "Order created successfully";
    } else {
        document.getElementById("message").textContent = "Error creating order";
    }
}

document.getElementById("orderBtn").addEventListener("click", createOrder);

loadProducts();
renderCart();
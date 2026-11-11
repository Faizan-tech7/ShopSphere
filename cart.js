let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");

function updateCartCount() {
    if (!cartCount) return;

    const totalQuantity = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalQuantity;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
    updateCartCount();
}

function renderCart() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart Is Empty</h2>
                <p>Add products to start shopping.</p>
            </div>
        `;

        document.getElementById("subtotal").textContent = "₹0";
        document.getElementById("total-price").textContent = "₹0";
        document.getElementById("total-items").textContent = "0";

        return;
    }

    cartItemsContainer.innerHTML = "";

    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;

        cartItemsContainer.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-details">
                    <h3>${item.name}</h3>

                    <p class="cart-price">
                        ₹${item.price}
                    </p>

                    <div class="quantity-controls">

                        <button onclick="decreaseQuantity(${item.id})">
                            -
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="increaseQuantity(${item.id})">
                            +
                        </button>

                    </div>
                </div>

                <button
                    class="remove-btn"
                    onclick="removeItem(${item.id})">
                    Remove
                </button>

            </div>
        `;
    });

    document.getElementById("subtotal").textContent =
        `₹${totalPrice}`;

    document.getElementById("total-price").textContent =
        `₹${totalPrice}`;

    document.getElementById("total-items").textContent =
        totalItems;
}

function increaseQuantity(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
        saveCart();
    }
}

function decreaseQuantity(id) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    if (item.quantity > 1) {
        item.quantity--;
    }

    saveCart();
}

function removeItem(id) {
    cart = cart.filter(product => product.id !== id);

    saveCart();
}

renderCart();
updateCartCount();
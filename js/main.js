let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productGrid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    if (productGrid) {
        displayProducts(products);
    }

    setupSearch();
    setupFilters();
    setupMobileMenu();
});

function displayProducts(productsToDisplay) {
    if (!productGrid) return;

    productGrid.innerHTML = "";

    if (productsToDisplay.length === 0) {
        productGrid.innerHTML = `
            <div class="no-products">
                <h3>No Products Found</h3>
            </div>
        `;
        return;
    }

    productsToDisplay.forEach((product) => {
        productGrid.innerHTML += `
            <div class="product-card">

                <a href="product.html?id=${product.id}">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >
                </a>

                <div class="product-content">

                    <a
                        href="product.html?id=${product.id}"
                        class="product-link"
                    >
                        <h3>${product.name}</h3>
                    </a>

                    <p class="product-rating">
                        ⭐ ${product.rating}
                    </p>

                    <p class="product-price">
                        ₹${product.price}
                    </p>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add To Cart
                    </button>

                </div>

            </div>
        `;
    });
}

function addToCart(productId) {
    const product = products.find(
        (item) => item.id === productId
    );

    if (!product) return;

    const existingItem = cart.find(
        (item) => item.id === productId
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();

    showNotification(
        `${product.name} added to cart`
    );
}

function saveCart() {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();
}

function updateCartCount() {
    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}

function setupSearch() {
    if (!searchInput) return;

    searchInput.addEventListener("input", (event) => {
        const searchValue =
            event.target.value.toLowerCase();

        const filteredProducts = products.filter(
            (product) =>
                product.name
                    .toLowerCase()
                    .includes(searchValue)
        );

        displayProducts(filteredProducts);
    });
}

function setupFilters() {
    if (!filterButtons.length) return;

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {

            filterButtons.forEach((btn) =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const category =
                button.dataset.category;

            if (category === "all") {
                displayProducts(products);
                return;
            }

            const filteredProducts =
                products.filter(
                    (product) =>
                        product.category === category
                );

            displayProducts(filteredProducts);
        });
    });
}

function setupMobileMenu() {
    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

function showNotification(message) {
    const notification =
        document.createElement("div");

    notification.classList.add(
        "notification"
    );

    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("show");
    }, 100);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const product = products.find(
    (item) => item.id === productId
);

function loadProductDetails() {
    if (!product) return;

    document.title = `${product.name} | ShopSphere`;

    document.getElementById("product-image").src =
        product.image;

    document.getElementById("product-image").alt =
        product.name;

    document.getElementById("product-title").textContent =
        product.name;

    document.getElementById("product-category").textContent =
        product.category;

    document.getElementById("product-price").textContent =
        `₹${product.price}`;

    document.getElementById("product-rating").textContent =
        `⭐ ${product.rating}`;

    document.getElementById("product-description").textContent =
        product.description;
}

function saveCart() {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

function addProductToCart(product) {
    const existingItem = cart.find(
        (item) => item.id === product.id
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
}

function setupAddToCartButton() {
    const addToCartBtn =
        document.getElementById("add-to-cart-btn");

    if (!addToCartBtn || !product) return;

    addToCartBtn.addEventListener("click", () => {
        addProductToCart(product);

       
        showNotification(`${product.name} added to cart!`);
    });
}

function showNotification(message) {
    const notification = document.createElement("div");

    notification.classList.add("notification");
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("show");
    }, 100);

    setTimeout(() => {
        notification.classList.remove("show");

        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
function setupBuyNowButton() {
    const buyNowBtn =
        document.querySelector(".buy-now-btn");

    if (!buyNowBtn || !product) return;

    buyNowBtn.addEventListener("click", () => {
        addProductToCart(product);

        window.location.href = "checkout.html";
    });
}

function loadRelatedProducts() {
    const relatedContainer =
        document.getElementById("related-products");

    if (!relatedContainer || !product) return;

    const relatedProducts = products
        .filter(
            (item) =>
                item.category === product.category &&
                item.id !== product.id
        )
        .slice(0, 4);

    relatedContainer.innerHTML = "";

    relatedProducts.forEach((item) => {
        relatedContainer.innerHTML += `
            <div class="product-card">

                <a href="product.html?id=${item.id}">
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >
                </a>

                <div class="product-content">

                    <a
                        href="product.html?id=${item.id}"
                        class="product-link"
                    >
                        <h3>${item.name}</h3>
                    </a>

                    <p class="product-rating">
                        ⭐ ${item.rating}
                    </p>

                    <p class="product-price">
                        ₹${item.price}
                    </p>

                    <button
                        class="add-cart-btn"
                        onclick="window.location.href='product.html?id=${item.id}'"
                    >
                        View Product
                    </button>

                </div>

            </div>
        `;
    });
}

loadProductDetails();
loadRelatedProducts();
setupAddToCartButton();
setupBuyNowButton();
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkout-items");
const totalItems = document.getElementById("checkout-total-items");
const subtotal = document.getElementById("checkout-subtotal");
const total = document.getElementById("checkout-total");

let totalPrice = 0;
let totalQuantity = 0;

cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalQuantity += item.quantity;

    checkoutItems.innerHTML += `
        <div class="checkout-item">

            <span class="checkout-product-name">
                ${item.name} × ${item.quantity}
            </span>

            <span class="checkout-product-price">
                ₹${item.price * item.quantity}
            </span>

        </div>
    `;
});

totalItems.textContent = totalQuantity;
subtotal.textContent = `₹${totalPrice}`;
total.textContent = `₹${totalPrice}`;

const placeOrderBtn = document.getElementById("place-order-btn");

placeOrderBtn.addEventListener("click", () => {

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const pincode = document.getElementById("pincode").value.trim();

    if (
        !fullName ||
        !email ||
        !phone ||
        !address ||
        !city ||
        !pincode
    ) {
        alert("Please fill in all required fields.");
        return;
    }

    localStorage.removeItem("cart");

    window.location.href = "success.html";
});
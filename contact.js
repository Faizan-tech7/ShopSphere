// EmailJS Initialization
(function () {
    emailjs.init("v_a-9g2KawKutrfum");
})();

// Elements
const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

// Form Submit
contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = document.querySelector(".submit-btn");

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    emailjs.sendForm(
        "service_dtvonrv",
        "template_m1qpide",
        this
    )
    .then(() => {

        successMessage.textContent =
            "✅ Message sent successfully!";
        successMessage.style.color = "#22c55e";

        contactForm.reset();

        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";

        setTimeout(() => {
            successMessage.textContent = "";
        }, 3000);

    })
    .catch((error) => {

        console.error("EmailJS Error:", error);

        successMessage.textContent =
            "❌ Failed to send message!";
        successMessage.style.color = "#ef4444";

        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";

    });
});
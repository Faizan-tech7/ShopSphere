document.addEventListener("DOMContentLoaded", () => {

    const themeToggle =
        document.getElementById("theme-toggle");

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme) {

        document.body.classList.toggle(
            "dark-mode",
            savedTheme === "dark"
        );

    } else {

        const prefersDark =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

        if (prefersDark) {
            document.body.classList.add("dark-mode");
        }
    }

    updateThemeIcon();

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const currentTheme =
                document.body.classList.contains(
                    "dark-mode"
                )
                    ? "dark"
                    : "light";

            localStorage.setItem(
                "theme",
                currentTheme
            );

            updateThemeIcon();
        });

    }

    function updateThemeIcon() {

        if (!themeToggle) return;

        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {
            themeToggle.innerHTML =
                '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML =
                '<i class="fas fa-moon"></i>';
        }
    }

});
document.querySelectorAll(".accordion-button").forEach((button) => {
    button.addEventListener("click", function () {
        const buttonTarget = this.getAttribute("data-bs-target");
        const element = document.querySelector(buttonTarget);

        if (element.classList.contains("show")) {
            // Close the currently open section if clicked again
            bootstrap.Collapse.getInstance(element).hide();
        } else {
            // Close all other sections
            document.querySelectorAll(".accordion-collapse").forEach((collapse) => {
                const instance = bootstrap.Collapse.getInstance(collapse);
                if (instance) instance.hide();
            });

            // Open the clicked section
            const instance = bootstrap.Collapse.getOrCreateInstance(element);
            instance.show();

            // Wait for the animation to finish before scrolling
            element.addEventListener(
                "transitionend",
                () => {
                    const offsetTop = this.offsetTop - 20; // Adjust for padding or navbar height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth",
                    });
                },
                { once: true } // Ensure the event listener is called only once
            );
        }
    });
});

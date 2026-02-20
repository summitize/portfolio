document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio Script Initialized");

    // Custom Cursor
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");

    if (cursorDot && cursorOutline) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    }

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                const nav = document.querySelector('.nav');
                if (nav) nav.classList.remove('active');
            }
        });
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        // Check for saved theme
        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                body.classList.add('light-mode');
            }
        } catch (e) {
            console.warn("localStorage not available");
        }

        themeToggle.addEventListener('click', () => {
            console.log("Theme Toggle Clicked");
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');

            try {
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
            } catch (e) {
                console.warn("Could not save theme preference");
            }

            // Interaction effect
            themeToggle.style.transform = "scale(0.8)";
            setTimeout(() => {
                themeToggle.style.transform = "scale(1.1)";
            }, 100);
        });
    } else {
        console.error("Theme toggle button not found!");
    }

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            console.log("Mobile menu toggled");
        });
    }
});

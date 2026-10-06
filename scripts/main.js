const menuButton = document.getElementById("menuButton");
const mainNavigation = document.getElementById("mainNavigation");
const navLinks = document.querySelectorAll(".main-navigation a");
const currentYear = document.getElementById("currentYear");
const contactForm = document.getElementById("contactForm");

// Mobile menu
if (menuButton && mainNavigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = mainNavigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);
    });
}

// Close mobile menu after clicking a link
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (mainNavigation) {
            mainNavigation.classList.remove("open");
        }

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
});

// Current year
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Reveal animation
const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .education-card, .skill-card, .project-card, .contact-info, .contact-form"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

// Active navigation section
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach((link) => {
                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${entry.target.id}`
                ) {
                    link.classList.add("active");
                }
            });
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});

// Temporary contact form behavior
if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        alert(
            "Contact form is ready. We will connect this to an email service later."
        );
    });
}
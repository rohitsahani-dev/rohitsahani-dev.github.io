const bodyPage = document.body.dataset.page || "";
const header = document.querySelector(".site-header");
const navMenu = document.querySelector(".nav-menu");
const menuToggle = document.querySelector(".menu-toggle");
const backToTop = document.querySelector(".back-to-top");
const yearSlot = document.querySelector("[data-year]");

if (yearSlot) {
    yearSlot.textContent = String(new Date().getFullYear());
}

document.querySelectorAll(".nav-menu a").forEach((link) => {
    if (link.dataset.page === bodyPage) {
        link.classList.add("active");
    }

    link.addEventListener("click", () => {
        if (navMenu && menuToggle) {
            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        }
    });
});

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
    });
}

const counters = document.querySelectorAll("[data-counter]");
let countersAnimated = false;

function formatCounter(number, mode) {
    if (mode === "compact" && number >= 1000) {
        return `${Math.round(number / 1000)}K`;
    }
    return `${Math.round(number)}`;
}

function animateCounters() {
    if (countersAnimated || !counters.length) {
        return;
    }

    countersAnimated = true;
    counters.forEach((counter) => {
        const target = Number(counter.dataset.counter || 0);
        const suffix = counter.dataset.suffix || "";
        const format = counter.dataset.format || "default";
        const duration = 1200;
        const started = performance.now();

        function tick(now) {
            const progress = Math.min((now - started) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = `${formatCounter(target * eased, format)}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                counter.textContent = `${formatCounter(target, format)}${suffix}`;
            }
        }

        requestAnimationFrame(tick);
    });
}

const counterSection = document.querySelector("[data-counter-section]");
if (counterSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.35 });

    observer.observe(counterSection);
} else {
    animateCounters();
}

document.querySelectorAll("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const message = form.dataset.success || "Thanks. Your message has been received.";
        window.alert(message);
        form.reset();
    });
});

function onScroll() {
    const y = window.scrollY;

    if (header) {
        header.classList.toggle("scrolled", y > 24);
    }

    if (backToTop) {
        backToTop.classList.toggle("visible", y > 600);
    }
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

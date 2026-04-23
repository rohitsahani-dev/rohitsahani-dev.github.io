// Core UI references
const root = document.documentElement;
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navItems = document.querySelectorAll(".nav-link, .nav-cta");
const sections = document.querySelectorAll("main section[id]");
const typingText = document.getElementById("typing-text");
const loader = document.getElementById("page-loader");
const progressBar = document.getElementById("scroll-progress");
const backToTop = document.getElementById("back-to-top");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const currentYear = document.getElementById("current-year");
const navbar = document.querySelector(".navbar");

const roles = [
  "AI-powered web systems built for real-world use.",
  "Python models connected to practical interfaces.",
  "full-stack products that combine data, APIs, and UI."
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);
  themeToggle.setAttribute("aria-pressed", String(theme === "light"));

  const themeColor = theme === "light" ? "#eef4ff" : "#0f172a";
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", themeColor);
  }
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");
  applyTheme(savedTheme || "dark");
}

function toggleTheme() {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
}

// Typing effect for hero roles
function typeRoles() {
  const currentRole = roles[roleIndex];
  typingText.textContent = currentRole.slice(0, charIndex);

  if (!isDeleting && charIndex < currentRole.length) {
    charIndex += 1;
    window.setTimeout(typeRoles, 90);
    return;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    window.setTimeout(typeRoles, 1400);
    return;
  }

  if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    window.setTimeout(typeRoles, 40);
    return;
  }

  isDeleting = false;
  roleIndex = (roleIndex + 1) % roles.length;
  window.setTimeout(typeRoles, 220);
}

// Scroll-linked UI updates
function updateScrollState() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;
  backToTop.classList.toggle("is-visible", scrollTop > 500);
}

function handleActiveNav() {
  const scrollPosition = window.scrollY + 140;

  sections.forEach((section) => {
    const link = document.querySelector(`.nav-link[href="#${section.id}"]`);

    if (!link) {
      return;
    }

    const inView =
      scrollPosition >= section.offsetTop &&
      scrollPosition < section.offsetTop + section.offsetHeight;

    link.classList.toggle("is-active", inView);
  });
}

// Mobile menu behavior
function toggleMenu() {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  body.classList.toggle("menu-open", isOpen);
}

function closeMenu() {
  navMenu.classList.remove("is-open");
  navToggle.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  body.classList.remove("menu-open");
}

// Reveal animations
function handleRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  revealItems.forEach((item) => observer.observe(item));
}

// Frontend-only contact form behavior
function handleContactForm(event) {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please complete all fields before sending your message.";
    return;
  }

  const mailSubject = encodeURIComponent(`AI project inquiry from ${name}`);
  const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  formStatus.textContent = "Opening your email client with a pre-filled message.";
  window.location.href = `mailto:rohit.sahani.dev@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  contactForm.reset();
}

function hideLoader() {
  loader.classList.add("is-hidden");
}

themeToggle.addEventListener("click", toggleTheme);
navToggle.addEventListener("click", toggleMenu);

navItems.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
  updateScrollState();
  handleActiveNav();
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

contactForm.addEventListener("submit", handleContactForm);

window.addEventListener("load", hideLoader);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

document.addEventListener("click", (event) => {
  if (navMenu.classList.contains("is-open") && navbar && !navbar.contains(event.target)) {
    closeMenu();
  }
});

initializeTheme();
typeRoles();
updateScrollState();
handleActiveNav();
handleRevealAnimations();
currentYear.textContent = new Date().getFullYear();

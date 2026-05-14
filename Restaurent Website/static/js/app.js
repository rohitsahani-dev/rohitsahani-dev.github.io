const CART_KEY = "restaurant_cart_v1";

function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.content || "";
}

function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3500);
}

async function apiRequest(url, options = {}) {
    const headers = new Headers(options.headers || {});
    headers.set("X-CSRF-Token", getCsrfToken());
    if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, {
        credentials: "same-origin",
        ...options,
        headers,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const message = data.error || Object.values(data.errors || {})[0] || "Request failed.";
        throw new Error(message);
    }
    return data;
}

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: cart }));
}

function addToCart(item, quantity) {
    const cart = getCart();
    const existing = cart.find((entry) => entry.menu_item_id === item.menu_item_id);
    if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, 10);
    } else {
        cart.push({ ...item, quantity });
    }
    saveCart(cart);
}

function removeFromCart(itemId) {
    saveCart(getCart().filter((item) => item.menu_item_id !== itemId));
}

function updateCartQuantity(itemId, quantity) {
    const cart = getCart().map((item) => item.menu_item_id === itemId ? { ...item, quantity } : item).filter((item) => item.quantity > 0);
    saveCart(cart);
}

function cartTotals(cart = getCart()) {
    return cart.reduce(
        (acc, item) => {
            acc.quantity += item.quantity;
            acc.total += item.price * item.quantity;
            return acc;
        },
        { quantity: 0, total: 0 }
    );
}

function renderMenuCartSummary() {
    const list = document.getElementById("cart-summary-items");
    const totalNode = document.getElementById("cart-summary-total");
    if (!list || !totalNode) return;

    const cart = getCart();
    const totals = cartTotals(cart);
    list.innerHTML = "";

    if (!cart.length) {
        list.innerHTML = "<p>Your cart is empty.</p>";
        totalNode.textContent = "$0.00";
        return;
    }

    cart.forEach((item) => {
        const row = document.createElement("div");
        row.className = "cart-summary-item";
        row.innerHTML = `<span>${item.name} x ${item.quantity}</span><strong>$${(item.price * item.quantity).toFixed(2)}</strong>`;
        list.appendChild(row);
    });

    totalNode.textContent = `$${totals.total.toFixed(2)}`;
}

function renderCheckout() {
    const container = document.getElementById("checkout-cart-items");
    const countNode = document.getElementById("checkout-item-count");
    const totalNode = document.getElementById("checkout-total");
    const placeOrderButton = document.getElementById("place-order-button");

    if (!container || !countNode || !totalNode || !placeOrderButton) return;

    const cart = getCart();
    const totals = cartTotals(cart);

    if (!cart.length) {
        showToast("Your cart is empty. Add menu items before checking out.", "error");
        window.location.href = "/menu";
        return;
    }

    container.innerHTML = "";
    cart.forEach((item) => {
        const row = document.createElement("div");
        row.className = "checkout-item-row";
        row.innerHTML = `<span>${item.name} x ${item.quantity}</span><strong>$${(item.price * item.quantity).toFixed(2)}</strong>`;
        container.appendChild(row);
    });

    countNode.textContent = String(totals.quantity);
    totalNode.textContent = `$${totals.total.toFixed(2)}`;

    placeOrderButton.addEventListener("click", async () => {
        placeOrderButton.disabled = true;
        placeOrderButton.textContent = "Placing Order...";

        try {
            await apiRequest("/api/orders", {
                method: "POST",
                body: JSON.stringify({
                    items: cart.map((item) => ({
                        menu_item_id: item.menu_item_id,
                        quantity: item.quantity,
                    })),
                }),
            });

            saveCart([]);
            showToast("Order placed successfully.", "success");
            setTimeout(() => {
                window.location.href = "/orders/history";
            }, 800);
        } catch (error) {
            showToast(error.message, "error");
        } finally {
            placeOrderButton.disabled = false;
            placeOrderButton.textContent = "Place Order";
        }
    });
}

function bindMenuInteractions() {
    const searchInput = document.getElementById("menu-search");
    const filterButtons = document.querySelectorAll("[data-category-filter]");
    const cards = document.querySelectorAll("[data-menu-card]");

    document.querySelectorAll("[data-quantity-control]").forEach((control) => {
        const input = control.querySelector("[data-qty-input]");
        control.querySelector("[data-qty-down]")?.addEventListener("click", () => {
            input.value = String(Math.max(1, Number(input.value || 1) - 1));
        });
        control.querySelector("[data-qty-up]")?.addEventListener("click", () => {
            input.value = String(Math.min(10, Number(input.value || 1) + 1));
        });
    });

    document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
        button.addEventListener("click", () => {
            const card = button.closest(".menu-item-card");
            const quantity = Number(card.querySelector("[data-qty-input]")?.value || 1);
            addToCart(
                {
                    menu_item_id: Number(button.dataset.itemId),
                    name: button.dataset.itemName,
                    price: Number(button.dataset.itemPrice),
                    image_url: button.dataset.itemImage || "",
                },
                quantity
            );
            renderMenuCartSummary();
            showToast(`${button.dataset.itemName} added to cart.`, "success");
        });
    });

    const applyFilters = () => {
        const searchTerm = (searchInput?.value || "").trim().toLowerCase();
        const activeFilter = document.querySelector(".filter-chip.active")?.dataset.categoryFilter || "all";

        cards.forEach((card) => {
            const matchesSearch = card.dataset.name.includes(searchTerm);
            const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
            card.style.display = matchesSearch && matchesCategory ? "" : "none";
        });
    };

    searchInput?.addEventListener("input", applyFilters);
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((chip) => chip.classList.remove("active"));
            button.classList.add("active");
            applyFilters();
        });
    });

    renderMenuCartSummary();
}

function bindReservationForm() {
    const form = document.getElementById("reservation-form");
    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(form).entries());

        try {
            await apiRequest("/api/reservations", {
                method: "POST",
                body: JSON.stringify(formData),
            });
            showToast("Reservation submitted successfully.", "success");
            form.reset();
        } catch (error) {
            showToast(error.message, "error");
        }
    });
}

function bindLogout() {
    document.querySelectorAll("[data-logout-button]").forEach((button) => {
        button.addEventListener("click", async () => {
            try {
                const response = await apiRequest("/api/logout", { method: "POST" });
                showToast("Logged out successfully.", "success");
                window.location.href = response.redirect_url;
            } catch (error) {
                showToast(error.message, "error");
            }
        });
    });
}

function bindMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}

window.showToast = showToast;
window.apiRequest = apiRequest;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;

document.addEventListener("DOMContentLoaded", () => {
    bindMobileNav();
    bindLogout();
    bindMenuInteractions();
    bindReservationForm();
    renderCheckout();
    renderMenuCartSummary();
});

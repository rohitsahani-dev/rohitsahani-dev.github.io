document.addEventListener("DOMContentLoaded", () => {
    bindMenuForm();
    bindCategoryActions();
    bindOrderActions();
    bindUserActions();
});

function bindMenuForm() {
    const form = document.getElementById("menu-item-form");
    if (!form) return;

    let editId = null;
    const submitButton = form.querySelector('button[type="submit"]');

    document.querySelectorAll(".admin-edit-menu").forEach((button) => {
        button.addEventListener("click", () => {
            const item = JSON.parse(button.dataset.item);
            form.name.value = item.name;
            form.price.value = item.price;
            form.description.value = item.description;
            form.category_id.value = item.category_id;
            form.is_available.checked = item.is_available;
            editId = item.id;
            submitButton.textContent = "Update Item";
            window.showToast(`Editing ${item.name}`, "info");
        });
    });

    document.querySelectorAll(".admin-delete-menu").forEach((button) => {
        button.addEventListener("click", async () => {
            if (!confirm("Delete this menu item?")) return;
            try {
                await window.apiRequest(`/api/menu/${button.dataset.id}`, { method: "DELETE" });
                window.showToast("Menu item deleted.", "success");
                window.location.reload();
            } catch (error) {
                window.showToast(error.message, "error");
            }
        });
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        try {
            if (!formData.has("is_available")) {
                formData.append("is_available", "false");
            }

            if (editId) {
                await window.apiRequest(`/api/menu/${editId}`, { method: "PUT", body: formData });
                window.showToast("Menu item updated.", "success");
            } else {
                await window.apiRequest("/api/menu", { method: "POST", body: formData });
                window.showToast("Menu item created.", "success");
            }
            window.location.reload();
        } catch (error) {
            window.showToast(error.message, "error");
        }
    });
}

function bindCategoryActions() {
    const form = document.getElementById("category-form");
    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const payload = Object.fromEntries(new FormData(form).entries());
            try {
                await window.apiRequest("/api/categories", { method: "POST", body: JSON.stringify(payload) });
                window.showToast("Category created.", "success");
                window.location.reload();
            } catch (error) {
                window.showToast(error.message, "error");
            }
        });
    }

    document.querySelectorAll(".admin-edit-category").forEach((button) => {
        button.addEventListener("click", async () => {
            const name = prompt("Rename category", button.dataset.name);
            if (!name) return;
            try {
                await window.apiRequest(`/api/categories/${button.dataset.id}`, {
                    method: "PUT",
                    body: JSON.stringify({ name }),
                });
                window.showToast("Category updated.", "success");
                window.location.reload();
            } catch (error) {
                window.showToast(error.message, "error");
            }
        });
    });

    document.querySelectorAll(".admin-delete-category").forEach((button) => {
        button.addEventListener("click", async () => {
            if (!confirm("Delete this category?")) return;
            try {
                await window.apiRequest(`/api/categories/${button.dataset.id}`, { method: "DELETE" });
                window.showToast("Category deleted.", "success");
                window.location.reload();
            } catch (error) {
                window.showToast(error.message, "error");
            }
        });
    });
}

function bindOrderActions() {
    document.querySelectorAll(".admin-update-order").forEach((button) => {
        button.addEventListener("click", async () => {
            const orderId = button.dataset.orderId;
            const select = document.querySelector(`.admin-order-status[data-order-id="${orderId}"]`);
            try {
                await window.apiRequest(`/api/orders/${orderId}`, {
                    method: "PUT",
                    body: JSON.stringify({ status: select.value }),
                });
                window.showToast("Order status updated.", "success");
                window.location.reload();
            } catch (error) {
                window.showToast(error.message, "error");
            }
        });
    });
}

function bindUserActions() {
    document.querySelectorAll(".admin-update-user").forEach((button) => {
        button.addEventListener("click", async () => {
            const userId = button.dataset.userId;
            const name = prompt("Update display name", button.dataset.name);
            if (!name) return;
            const roleSelect = document.querySelector(`.admin-user-role[data-user-id="${userId}"]`);
            try {
                await window.apiRequest(`/api/users/${userId}`, {
                    method: "PUT",
                    body: JSON.stringify({ name, role: roleSelect.value }),
                });
                window.showToast("User updated.", "success");
                window.location.reload();
            } catch (error) {
                window.showToast(error.message, "error");
            }
        });
    });

    document.querySelectorAll(".admin-delete-user").forEach((button) => {
        button.addEventListener("click", async () => {
            if (!confirm("Delete this user?")) return;
            try {
                await window.apiRequest(`/api/users/${button.dataset.userId}`, { method: "DELETE" });
                window.showToast("User deleted.", "success");
                window.location.reload();
            } catch (error) {
                window.showToast(error.message, "error");
            }
        });
    });
}

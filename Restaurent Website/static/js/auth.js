document.addEventListener("DOMContentLoaded", () => {
    const formConfig = [
        { id: "login-form", endpoint: "/api/login", extra: {} },
        { id: "register-form", endpoint: "/api/register", extra: {} },
        { id: "admin-login-form", endpoint: "/api/login", extra: { expected_role: "admin" } },
    ];

    formConfig.forEach(({ id, endpoint, extra }) => {
        const form = document.getElementById(id);
        if (!form) return;

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
            const payload = Object.fromEntries(new FormData(form).entries());
            Object.assign(payload, extra);

            submitButton.disabled = true;
            submitButton.textContent = "Please wait...";

            try {
                const response = await window.apiRequest(endpoint, {
                    method: "POST",
                    body: JSON.stringify(payload),
                });
                window.showToast(response.message || "Success.", "success");
                window.location.href = response.redirect_url;
            } catch (error) {
                window.showToast(error.message, "error");
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = id === "register-form" ? "Register" : id === "admin-login-form" ? "Enter Dashboard" : "Login";
            }
        });
    });
});

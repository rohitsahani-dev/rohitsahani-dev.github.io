document.querySelectorAll("[data-qty-group]").forEach((group) => {
    const input = group.querySelector(".qty-input");
    if (!input) {
        return;
    }

    group.querySelectorAll(".qty-button").forEach((button) => {
        button.addEventListener("click", () => {
            const direction = button.dataset.direction === "down" ? -1 : 1;
            const min = Number(input.min || 1);
            const max = Number(input.max || 20);
            const current = Number(input.value || min);
            const next = Math.max(min, Math.min(max, current + direction));
            input.value = String(next);
        });
    });
});

const deliverySelect = document.querySelector("[data-delivery-select]");
const deliveryFields = document.querySelector("[data-delivery-fields]");

function updateDeliveryState() {
    if (!deliverySelect || !deliveryFields) {
        return;
    }

    const isDelivery = deliverySelect.value === "delivery";
    deliveryFields.hidden = !isDelivery;

    deliveryFields.querySelectorAll("input").forEach((field) => {
        field.required = isDelivery;
    });

    const subtotal = Number(deliverySelect.dataset.subtotal || 0);
    const deliveryFee = Number(deliverySelect.dataset.deliveryFee || 0);
    const serviceFee = isDelivery ? deliveryFee : 0;
    const total = subtotal + serviceFee;

    document.querySelectorAll("[data-service-fee]").forEach((node) => {
        node.textContent = `$${serviceFee.toFixed(2)}`;
    });

    document.querySelectorAll("[data-total-amount]").forEach((node) => {
        node.textContent = `$${total.toFixed(2)}`;
    });
}

if (deliverySelect) {
    deliverySelect.addEventListener("change", updateDeliveryState);
    updateDeliveryState();
}

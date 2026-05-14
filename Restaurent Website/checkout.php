<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';

$cartItems = get_cart_items();
if (!$cartItems) {
    set_flash('error', 'Your cart is empty. Add items before checking out.');
    redirect('menu.php');
}

$form = [
    'customer_name' => '',
    'customer_email' => '',
    'customer_phone' => '',
    'delivery_type' => 'pickup',
    'address_line' => '',
    'city' => '',
    'notes' => '',
];

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    foreach ($form as $key => $value) {
        $form[$key] = trim((string) ($_POST[$key] ?? $value));
    }

    if ($form['customer_name'] === '') {
        $errors[] = 'Customer name is required.';
    }

    if (!filter_var($form['customer_email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Please enter a valid email address.';
    }

    if ($form['customer_phone'] === '') {
        $errors[] = 'Phone number is required.';
    }

    if (!in_array($form['delivery_type'], ['pickup', 'delivery'], true)) {
        $errors[] = 'Please choose pickup or delivery.';
    }

    if ($form['delivery_type'] === 'delivery') {
        if ($form['address_line'] === '') {
            $errors[] = 'Delivery address is required for delivery orders.';
        }
        if ($form['city'] === '') {
            $errors[] = 'City is required for delivery orders.';
        }
    }

    if (!$errors) {
        try {
            $orderNumber = create_order($form, $cartItems);
            clear_cart();
            set_flash('success', 'Your order has been placed successfully.');
            redirect('order-success.php?order=' . urlencode($orderNumber));
        } catch (Throwable) {
            $errors[] = 'Something went wrong while saving your order. Please try again.';
        }
    }
}

$totals = calculate_order_totals($cartItems, $form['delivery_type']);
$pageTitle = APP_NAME . ' | Checkout';
$bodyPage = 'checkout';
$pageDescription = 'Enter your details, choose pickup or delivery, and place your order.';

require __DIR__ . '/includes/header.php';
?>
<main>
    <section class="page-hero">
        <div class="container">
            <div class="page-hero-grid">
                <div class="page-hero-copy">
                    <span class="eyebrow">Checkout</span>
                    <h1>Complete your order with confidence</h1>
                    <p>Finish your order with a clean, restaurant-quality checkout that saves all details directly into MySQL.</p>
                </div>
                <div class="page-hero-visual">
                    <div class="visual-panel">
                        <div class="mini-card"><strong>Secure by design</strong><span>Server-side validation keeps the final totals and order data trustworthy.</span></div>
                        <div class="mini-card"><strong>Delivery aware</strong><span>Delivery fee updates automatically when delivery is selected.</span></div>
                        <div class="mini-card"><strong>Receipt ready</strong><span>After checkout, guests land on a full confirmation page with their order number.</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="checkout-grid">
                <form class="checkout-form-card" method="post" action="checkout.php">
                    <h3>Guest Details</h3>
                    <p class="field-note">Fields marked through validation are required to complete the order.</p>

                    <?php if ($errors): ?>
                        <div class="form-errors">
                            <ul>
                                <?php foreach ($errors as $error): ?>
                                    <li><?= e($error) ?></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endif; ?>

                    <div class="form-grid">
                        <div class="form-group">
                            <label for="customer_name">Full Name</label>
                            <input id="customer_name" name="customer_name" type="text" value="<?= e($form['customer_name']) ?>" required>
                        </div>
                        <div class="form-group">
                            <label for="customer_phone">Phone</label>
                            <input id="customer_phone" name="customer_phone" type="tel" value="<?= e($form['customer_phone']) ?>" required>
                        </div>
                        <div class="form-group">
                            <label for="customer_email">Email</label>
                            <input id="customer_email" name="customer_email" type="email" value="<?= e($form['customer_email']) ?>" required>
                        </div>
                        <div class="form-group">
                            <label for="delivery_type">Order Type</label>
                            <select
                                id="delivery_type"
                                name="delivery_type"
                                data-delivery-select
                                data-subtotal="<?= e(number_format($totals['subtotal'], 2, '.', '')) ?>"
                                data-delivery-fee="<?= e(number_format(DELIVERY_FEE, 2, '.', '')) ?>"
                            >
                                <option value="pickup" <?= $form['delivery_type'] === 'pickup' ? 'selected' : '' ?>>Pickup</option>
                                <option value="delivery" <?= $form['delivery_type'] === 'delivery' ? 'selected' : '' ?>>Delivery</option>
                            </select>
                        </div>
                        <div class="delivery-fields form-group full" data-delivery-fields <?= $form['delivery_type'] !== 'delivery' ? 'hidden' : '' ?>>
                            <div class="form-grid">
                                <div class="form-group">
                                    <label for="address_line">Address</label>
                                    <input id="address_line" name="address_line" type="text" value="<?= e($form['address_line']) ?>">
                                </div>
                                <div class="form-group">
                                    <label for="city">City</label>
                                    <input id="city" name="city" type="text" value="<?= e($form['city']) ?>">
                                </div>
                            </div>
                        </div>
                        <div class="form-group full">
                            <label for="notes">Order Notes</label>
                            <textarea id="notes" name="notes" placeholder="Delivery notes, allergies, or special requests"><?= e($form['notes']) ?></textarea>
                        </div>
                    </div>

                    <div class="summary-actions">
                        <button class="button-primary" type="submit">Place Order</button>
                        <a class="button-light" href="cart.php">Back to Cart</a>
                    </div>
                </form>

                <aside class="summary-card">
                    <h3>Checkout Summary</h3>
                    <div class="checkout-summary-items">
                        <?php foreach ($cartItems as $item): ?>
                            <div class="checkout-summary-item">
                                <span><?= e($item['name']) ?> x <?= (int) $item['quantity'] ?></span>
                                <strong><?= money((float) $item['line_total']) ?></strong>
                            </div>
                        <?php endforeach; ?>
                    </div>
                    <div class="summary-list">
                        <div class="summary-row">
                            <span>Subtotal</span>
                            <strong><?= money($totals['subtotal']) ?></strong>
                        </div>
                        <div class="summary-row">
                            <span>Delivery fee</span>
                            <strong data-service-fee><?= money($totals['service_fee']) ?></strong>
                        </div>
                        <div class="summary-row total">
                            <span>Total</span>
                            <strong data-total-amount><?= money($totals['total']) ?></strong>
                        </div>
                    </div>
                    <div class="pill-note"><i class="fas fa-truck"></i> Delivery adds <?= money(DELIVERY_FEE) ?>. Pickup remains free.</div>
                </aside>
            </div>
        </div>
    </section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>

<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $itemId = (int) ($_POST['item_id'] ?? 0);
    $action = $_POST['action'] ?? '';

    if ($itemId > 0) {
        if ($action === 'remove') {
            remove_cart_item($itemId);
            set_flash('success', 'Item removed from cart.');
        } elseif ($action === 'update') {
            $quantity = (int) ($_POST['quantity'] ?? 1);
            update_cart_item($itemId, $quantity);
            set_flash('success', 'Cart updated successfully.');
        }
    }

    redirect('cart.php');
}

$cartItems = get_cart_items();
$totals = calculate_order_totals($cartItems, 'pickup');

$pageTitle = APP_NAME . ' | Cart';
$bodyPage = 'cart';
$pageDescription = 'Review your selected dishes, adjust quantity, and continue to checkout.';

require __DIR__ . '/includes/header.php';
?>
<main>
    <section class="page-hero">
        <div class="container">
            <div class="page-hero-grid">
                <div class="page-hero-copy">
                    <span class="eyebrow">Your Cart</span>
                    <h1>Review your order before checkout</h1>
                    <p>Adjust quantities, remove items, and confirm the total before moving to the final checkout page.</p>
                </div>
                <div class="page-hero-visual">
                    <div class="visual-panel">
                        <div class="mini-card"><strong><?= cart_item_count() ?></strong><span>items currently in your cart</span></div>
                        <div class="mini-card"><strong><?= money($totals['subtotal']) ?></strong><span>current food subtotal</span></div>
                        <div class="mini-card"><strong>Pickup or delivery</strong><span>Choose your fulfilment method at checkout.</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <?php if (!$cartItems): ?>
                <div class="empty-state summary-card">
                    <h2>Your cart is empty</h2>
                    <p>Browse the online menu and add a few signature dishes to start your order.</p>
                    <a class="button-primary" href="menu.php">Browse Menu</a>
                </div>
            <?php else: ?>
                <div class="cart-layout">
                    <div class="cart-table-card">
                        <table class="cart-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($cartItems as $item): ?>
                                    <tr>
                                        <td>
                                            <div class="cart-item-name"><?= e($item['name']) ?></div>
                                            <div class="cart-item-meta"><?= e($item['category_name']) ?> - <?= e($item['description']) ?></div>
                                        </td>
                                        <td>
                                            <form method="post" action="cart.php">
                                                <input type="hidden" name="action" value="update">
                                                <input type="hidden" name="item_id" value="<?= (int) $item['id'] ?>">
                                                <div class="qty-control" data-qty-group>
                                                    <button class="qty-button" type="button" data-direction="down" aria-label="Decrease quantity">-</button>
                                                    <input class="qty-input" type="number" name="quantity" value="<?= (int) $item['quantity'] ?>" min="1" max="20" aria-label="Quantity">
                                                    <button class="qty-button" type="button" data-direction="up" aria-label="Increase quantity">+</button>
                                                </div>
                                                <div style="margin-top: 0.75rem;">
                                                    <button class="button-light" type="submit">Update</button>
                                                </div>
                                            </form>
                                        </td>
                                        <td><?= money((float) $item['price']) ?></td>
                                        <td><?= money((float) $item['line_total']) ?></td>
                                        <td>
                                            <form class="inline-form" method="post" action="cart.php">
                                                <input type="hidden" name="action" value="remove">
                                                <input type="hidden" name="item_id" value="<?= (int) $item['id'] ?>">
                                                <button class="link-button" type="submit">Remove</button>
                                            </form>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>

                    <aside class="summary-card">
                        <h3>Order Summary</h3>
                        <div class="summary-list">
                            <div class="summary-row">
                                <span>Subtotal</span>
                                <strong><?= money($totals['subtotal']) ?></strong>
                            </div>
                            <div class="summary-row">
                                <span>Delivery fee</span>
                                <strong>Calculated at checkout</strong>
                            </div>
                            <div class="summary-row total">
                                <span>Estimated total</span>
                                <strong><?= money($totals['subtotal'] + DELIVERY_FEE) ?></strong>
                            </div>
                        </div>
                        <div class="pill-note"><i class="fas fa-circle-info"></i> Pickup orders skip the delivery fee.</div>
                        <div class="summary-actions">
                            <a class="button-primary" href="checkout.php">Continue to Checkout</a>
                            <a class="button-light" href="menu.php">Add More Items</a>
                        </div>
                    </aside>
                </div>
            <?php endif; ?>
        </div>
    </section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>

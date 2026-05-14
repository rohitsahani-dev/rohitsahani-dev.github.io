<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';

$orderNumber = trim((string) ($_GET['order'] ?? ''));
$order = $orderNumber !== '' ? get_order_by_number($orderNumber) : null;

if (!$order) {
    set_flash('error', 'We could not find that order confirmation.');
    redirect('menu.php');
}

$pageTitle = APP_NAME . ' | Order Confirmed';
$bodyPage = 'success';
$pageDescription = 'Your order has been placed successfully.';

require __DIR__ . '/includes/header.php';
?>
<main>
    <section class="section">
        <div class="container">
            <div class="success-grid">
                <div class="success-card">
                    <div class="success-badge"><i class="fas fa-check"></i></div>
                    <h1>Your order is confirmed</h1>
                    <p>Thank you for ordering from La Bella Italia. Our kitchen has received your request and your order is now saved in MySQL.</p>
                    <div class="order-number-pill">
                        <i class="fas fa-receipt"></i>
                        <span>Order Number: <?= e($order['order_number']) ?></span>
                    </div>
                    <div class="summary-actions" style="margin-top: 1.5rem;">
                        <a class="button-primary" href="menu.php">Order More</a>
                        <a class="button-light" href="index.php">Back Home</a>
                    </div>
                </div>

                <aside class="receipt-card">
                    <h3>Receipt Summary</h3>
                    <div class="receipt-meta">
                        <div class="receipt-meta-row">
                            <span>Customer</span>
                            <strong><?= e($order['customer_name']) ?></strong>
                        </div>
                        <div class="receipt-meta-row">
                            <span>Order type</span>
                            <strong><?= e(ucfirst((string) $order['delivery_type'])) ?></strong>
                        </div>
                        <div class="receipt-meta-row">
                            <span>Email</span>
                            <strong><?= e($order['customer_email']) ?></strong>
                        </div>
                        <div class="receipt-meta-row">
                            <span>Placed</span>
                            <strong><?= e($order['created_at']) ?></strong>
                        </div>
                    </div>

                    <div class="receipt-items">
                        <?php foreach ($order['items'] as $item): ?>
                            <div class="receipt-item">
                                <span><?= e($item['item_name']) ?> x <?= (int) $item['quantity'] ?></span>
                                <strong><?= money((float) $item['line_total']) ?></strong>
                            </div>
                        <?php endforeach; ?>
                    </div>

                    <div class="summary-list">
                        <div class="summary-row">
                            <span>Subtotal</span>
                            <strong><?= money((float) $order['subtotal']) ?></strong>
                        </div>
                        <div class="summary-row">
                            <span>Delivery fee</span>
                            <strong><?= money((float) $order['service_fee']) ?></strong>
                        </div>
                        <div class="summary-row total">
                            <span>Total paid</span>
                            <strong><?= money((float) $order['total_amount']) ?></strong>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>

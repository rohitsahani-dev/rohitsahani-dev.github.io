<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $itemId = (int) ($_POST['item_id'] ?? 0);
    $quantity = (int) ($_POST['quantity'] ?? 1);

    if ($itemId <= 0 || !add_item_to_cart($itemId, $quantity)) {
        set_flash('error', 'That menu item could not be added to your cart.');
    } else {
        set_flash('success', 'Item added to cart successfully.');
    }

    redirect('menu.php');
}

$catalog = get_menu_catalog();
$pageTitle = APP_NAME . ' | Order Online';
$bodyPage = 'menu';
$pageDescription = 'Browse the live menu, add items to your cart, and place your order online.';

require __DIR__ . '/includes/header.php';
?>
<main>
    <section class="page-hero">
        <div class="container">
            <div class="page-hero-grid">
                <div class="page-hero-copy">
                    <span class="eyebrow">Online Menu</span>
                    <h1>Build your order with real cart actions</h1>
                    <p>Every menu item on this page comes from MySQL, with a direct add-to-cart workflow, quantity picker, and a cleaner professional presentation.</p>
                    <div class="page-hero-actions">
                        <a class="button-primary" href="cart.php"><i class="fas fa-cart-shopping"></i> View Cart</a>
                        <a class="button-light" href="checkout.php">Go to Checkout</a>
                    </div>
                </div>
                <div class="page-hero-visual">
                    <div class="visual-panel">
                        <div class="mini-card">
                            <strong>Live from MySQL</strong>
                            <span>Change menu items in the database and this page updates automatically.</span>
                        </div>
                        <div class="mini-card">
                            <strong>Fast ordering</strong>
                            <span>Guests can choose quantity and add straight to the cart without leaving the page.</span>
                        </div>
                        <div class="mini-card">
                            <strong>Professional flow</strong>
                            <span>Cart, checkout, and order success pages all match the restaurant branding.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php foreach ($catalog as $category): ?>
        <section class="section category-section">
            <div class="container">
                <div class="category-header">
                    <div>
                        <span class="eyebrow"><?= e($category['name']) ?></span>
                        <h2><?= e($category['name']) ?></h2>
                        <p><?= count($category['items']) ?> items available for online ordering</p>
                    </div>
                </div>
                <div class="menu-grid">
                    <?php foreach ($category['items'] as $item): ?>
                        <article class="menu-card">
                            <div class="menu-card-image" style="background: linear-gradient(135deg, <?= e($item['gradient_start']) ?>, <?= e($item['gradient_end']) ?>);">
                                <?php if (!empty($item['badge'])): ?>
                                    <span class="badge"><?= e($item['badge']) ?></span>
                                <?php endif; ?>
                            </div>
                            <div class="menu-card-body">
                                <div class="menu-card-top">
                                    <h3><?= e($item['name']) ?></h3>
                                    <span class="price"><?= money((float) $item['price']) ?></span>
                                </div>
                                <p><?= e($item['description']) ?></p>
                                <div class="menu-card-footer">
                                    <span class="menu-card-meta"><i class="fas fa-clock"></i> <?= (int) $item['prep_time_minutes'] ?> mins</span>
                                    <span class="menu-card-meta"><i class="fas fa-fire-flame-curved"></i> Freshly prepared</span>
                                </div>
                                <form class="add-to-cart-form" method="post" action="menu.php">
                                    <input type="hidden" name="item_id" value="<?= (int) $item['id'] ?>">
                                    <div class="qty-control" data-qty-group>
                                        <button class="qty-button" type="button" data-direction="down" aria-label="Decrease quantity">-</button>
                                        <input class="qty-input" type="number" name="quantity" value="1" min="1" max="20" aria-label="Item quantity">
                                        <button class="qty-button" type="button" data-direction="up" aria-label="Increase quantity">+</button>
                                    </div>
                                    <button class="button-primary add-cart-btn" type="submit">
                                        <i class="fas fa-cart-plus"></i>
                                        Add to Cart
                                    </button>
                                </form>
                            </div>
                        </article>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
    <?php endforeach; ?>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>

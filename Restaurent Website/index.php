<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';

$pageTitle = APP_NAME . ' | Online Ordering';
$bodyPage = 'home';
$pageDescription = 'Professional online ordering for La Bella Italia with XAMPP-ready PHP and MySQL.';

$catalog = get_menu_catalog();
$featuredItems = [];

foreach ($catalog as $category) {
    foreach ($category['items'] as $item) {
        if ((int) $item['is_featured'] === 1) {
            $featuredItems[] = $item;
        }
    }
}

$featuredItems = array_slice($featuredItems, 0, 3);

require __DIR__ . '/includes/header.php';
?>
<main>
    <section class="hero-home">
        <div class="container-wide">
            <div class="hero-grid">
                <div class="hero-copy">
                    <span class="eyebrow"><i class="fas fa-bag-shopping"></i> XAMPP online ordering</span>
                    <h1>Order authentic Italian <span>without leaving the table</span></h1>
                    <p>The restaurant site now includes a real PHP and MySQL ordering system with add-to-cart flow, quantity control, live totals, and a professional checkout experience built for XAMPP.</p>
                    <div class="hero-actions">
                        <a class="button-primary" href="menu.php"><i class="fas fa-utensils"></i> Start Your Order</a>
                        <a class="button-secondary" href="cart.php"><i class="fas fa-cart-shopping"></i> View Cart</a>
                    </div>
                    <div class="hero-order-stat-grid">
                        <div class="hero-order-stat">
                            <strong>13</strong>
                            <span>Seeded menu items</span>
                        </div>
                        <div class="hero-order-stat">
                            <strong>5</strong>
                            <span>Menu categories</span>
                        </div>
                        <div class="hero-order-stat">
                            <strong>24/7</strong>
                            <span>Ready for local testing</span>
                        </div>
                    </div>
                </div>
                <div class="hero-stack">
                    <article class="card">
                        <div class="icon-box"><i class="fas fa-database"></i></div>
                        <h3>MySQL Backed</h3>
                        <p>Menu items, orders, and order lines are stored in a proper MySQL schema that you can import into phpMyAdmin.</p>
                    </article>
                    <article class="card">
                        <div class="icon-box"><i class="fas fa-cart-plus"></i></div>
                        <h3>Real Cart Flow</h3>
                        <p>Add items, update quantity, remove products, and watch totals update cleanly across the journey.</p>
                    </article>
                    <article class="card">
                        <div class="icon-box"><i class="fas fa-credit-card"></i></div>
                        <h3>Professional Checkout</h3>
                        <p>Guest details, pickup or delivery, order notes, and saved order records with a receipt-style success page.</p>
                    </article>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="section-heading">
                <span class="eyebrow">How it works</span>
                <h2>One complete ordering experience</h2>
                <p>The site is no longer just a design showcase. It now behaves like a restaurant storefront with a connected ordering workflow.</p>
            </div>
            <div class="order-highlights">
                <article class="order-highlight-card">
                    <div class="icon-box"><i class="fas fa-utensils"></i></div>
                    <h3>1. Browse the menu</h3>
                    <p>Products are loaded from MySQL and grouped by category for a more professional menu presentation.</p>
                </article>
                <article class="order-highlight-card">
                    <div class="icon-box"><i class="fas fa-plus-minus"></i></div>
                    <h3>2. Build the cart</h3>
                    <p>Choose quantity, update line items, and keep track of the order in a persistent session cart.</p>
                </article>
                <article class="order-highlight-card">
                    <div class="icon-box"><i class="fas fa-receipt"></i></div>
                    <h3>3. Checkout and save</h3>
                    <p>Customer details and order totals are saved into MySQL so you have a real record of each purchase.</p>
                </article>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="section-heading">
                <span class="eyebrow">Featured right now</span>
                <h2>Popular picks from the live menu</h2>
                <p>These cards pull from the same MySQL-backed menu data used by the ordering page.</p>
            </div>
            <div class="menu-grid">
                <?php foreach ($featuredItems as $item): ?>
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
                                <a class="button-primary" href="menu.php">Order Now</a>
                            </div>
                        </div>
                    </article>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>

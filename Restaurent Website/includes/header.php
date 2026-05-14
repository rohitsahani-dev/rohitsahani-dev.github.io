<?php
declare(strict_types=1);

$pageTitle = $pageTitle ?? APP_NAME;
$bodyPage = $bodyPage ?? '';
$pageDescription = $pageDescription ?? 'Professional online ordering for La Bella Italia.';
$flash = get_flash();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?= e($pageDescription) ?>">
    <title><?= e($pageTitle) ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/styles.css">
    <link rel="stylesheet" href="assets/css/ordering.css">
</head>
<body data-page="<?= e($bodyPage) ?>">
    <header class="site-header">
        <nav class="nav-shell" aria-label="Primary">
            <a class="brand" href="index.php">
                <span class="brand-mark"><i class="fas fa-utensils"></i></span>
                <span class="brand-text">La Bella Italia</span>
            </a>
            <ul class="nav-menu">
                <li><a href="index.php" data-page="home">Home</a></li>
                <li><a href="menu.php" data-page="menu">Order Online</a></li>
                <li><a href="cart.php" data-page="cart">Cart</a></li>
                <li><a href="checkout.php" data-page="checkout">Checkout</a></li>
                <li><a href="about.html" data-page="about">About</a></li>
                <li><a href="gallery.html" data-page="gallery">Gallery</a></li>
                <li><a href="contact.html" data-page="contact">Contact</a></li>
            </ul>
            <div class="nav-actions">
                <a class="cart-chip" href="cart.php" aria-label="View cart">
                    <i class="fas fa-bag-shopping"></i>
                    <span>Cart</span>
                    <strong><?= cart_item_count() ?></strong>
                </a>
                <a class="button-primary" href="menu.php">Start Order</a>
                <button class="menu-toggle" type="button" aria-label="Toggle menu" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    </header>
    <?php if ($flash): ?>
        <div class="container">
            <div class="flash-banner flash-<?= e($flash['type']) ?>">
                <i class="fas fa-circle-info"></i>
                <span><?= e($flash['message']) ?></span>
            </div>
        </div>
    <?php endif; ?>

<?php
declare(strict_types=1);

function e(null|string|int|float $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function money(float $amount): string
{
    return CURRENCY_SYMBOL . number_format($amount, 2);
}

function redirect(string $path): never
{
    header('Location: ' . $path);
    exit;
}

function set_flash(string $type, string $message): void
{
    $_SESSION['flash'] = [
        'type' => $type,
        'message' => $message,
    ];
}

function get_flash(): ?array
{
    if (!isset($_SESSION['flash'])) {
        return null;
    }

    $flash = $_SESSION['flash'];
    unset($_SESSION['flash']);

    return $flash;
}

function cart_contents(): array
{
    return $_SESSION['cart'] ?? [];
}

function cart_item_count(): int
{
    return array_sum(array_map('intval', cart_contents()));
}

function clear_cart(): void
{
    unset($_SESSION['cart']);
}

function find_menu_item(int $itemId): ?array
{
    $statement = db()->prepare(
        'SELECT mi.*, c.name AS category_name, c.slug AS category_slug
         FROM menu_items mi
         INNER JOIN categories c ON c.id = mi.category_id
         WHERE mi.id = ? AND mi.is_available = 1
         LIMIT 1'
    );

    $statement->bind_param('i', $itemId);
    $statement->execute();
    $result = $statement->get_result();
    $item = $result->fetch_assoc();
    $statement->close();

    return $item ?: null;
}

function add_item_to_cart(int $itemId, int $quantity): bool
{
    $item = find_menu_item($itemId);
    if (!$item) {
        return false;
    }

    $quantity = max(1, min(20, $quantity));
    $_SESSION['cart'][$itemId] = min(20, (int) ($_SESSION['cart'][$itemId] ?? 0) + $quantity);

    return true;
}

function update_cart_item(int $itemId, int $quantity): void
{
    if ($quantity <= 0) {
        unset($_SESSION['cart'][$itemId]);
        return;
    }

    if (!find_menu_item($itemId)) {
        unset($_SESSION['cart'][$itemId]);
        return;
    }

    $_SESSION['cart'][$itemId] = min(20, $quantity);
}

function remove_cart_item(int $itemId): void
{
    unset($_SESSION['cart'][$itemId]);
}

function get_menu_catalog(): array
{
    $query = db()->query(
        'SELECT c.id AS category_id, c.name AS category_name, c.slug AS category_slug,
                mi.id, mi.name, mi.description, mi.price, mi.badge, mi.gradient_start,
                mi.gradient_end, mi.prep_time_minutes, mi.is_featured
         FROM categories c
         LEFT JOIN menu_items mi ON mi.category_id = c.id AND mi.is_available = 1
         ORDER BY c.sort_order ASC, mi.sort_order ASC, mi.name ASC'
    );

    $catalog = [];

    while ($row = $query->fetch_assoc()) {
        $categoryId = (int) $row['category_id'];

        if (!isset($catalog[$categoryId])) {
            $catalog[$categoryId] = [
                'id' => $categoryId,
                'name' => $row['category_name'],
                'slug' => $row['category_slug'],
                'items' => [],
            ];
        }

        if ($row['id'] === null) {
            continue;
        }

        $catalog[$categoryId]['items'][] = $row;
    }

    return array_values($catalog);
}

function get_cart_items(): array
{
    $cart = cart_contents();
    if (!$cart) {
        return [];
    }

    $itemIds = array_map('intval', array_keys($cart));
    $placeholders = implode(',', array_fill(0, count($itemIds), '?'));
    $types = str_repeat('i', count($itemIds));

    $statement = db()->prepare(
        "SELECT mi.*, c.name AS category_name
         FROM menu_items mi
         INNER JOIN categories c ON c.id = mi.category_id
         WHERE mi.id IN ($placeholders) AND mi.is_available = 1"
    );

    $statement->bind_param($types, ...$itemIds);
    $statement->execute();
    $result = $statement->get_result();

    $items = [];
    while ($row = $result->fetch_assoc()) {
        $itemId = (int) $row['id'];
        $quantity = (int) ($cart[$itemId] ?? 0);
        if ($quantity <= 0) {
            continue;
        }

        $row['quantity'] = $quantity;
        $row['line_total'] = (float) $row['price'] * $quantity;
        $items[] = $row;
    }

    $statement->close();

    usort($items, static fn (array $a, array $b): int => strcmp($a['category_name'] . $a['name'], $b['category_name'] . $b['name']));

    return $items;
}

function cart_subtotal(array $items): float
{
    return array_reduce(
        $items,
        static fn (float $carry, array $item): float => $carry + (float) $item['line_total'],
        0.0
    );
}

function delivery_fee_for(string $deliveryType): float
{
    return $deliveryType === 'delivery' ? DELIVERY_FEE : 0.0;
}

function calculate_order_totals(array $items, string $deliveryType): array
{
    $subtotal = cart_subtotal($items);
    $serviceFee = delivery_fee_for($deliveryType);
    $total = $subtotal + $serviceFee;

    return [
        'subtotal' => $subtotal,
        'service_fee' => $serviceFee,
        'total' => $total,
    ];
}

function generate_order_number(): string
{
    try {
        $suffix = strtoupper(bin2hex(random_bytes(2)));
    } catch (Throwable) {
        $suffix = strtoupper(substr(md5((string) mt_rand()), 0, 4));
    }

    return 'LBI-' . date('Ymd') . '-' . $suffix;
}

function create_order(array $payload, array $items): string
{
    $deliveryType = $payload['delivery_type'];
    $totals = calculate_order_totals($items, $deliveryType);
    $orderNumber = generate_order_number();
    $db = db();

    $db->begin_transaction();

    try {
        $orderStatement = $db->prepare(
            'INSERT INTO orders (
                order_number, customer_name, customer_email, customer_phone, delivery_type,
                address_line, city, notes, subtotal, service_fee, total_amount, status
             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );

        $status = 'new';
        $orderStatement->bind_param(
            'ssssssssddds',
            $orderNumber,
            $payload['customer_name'],
            $payload['customer_email'],
            $payload['customer_phone'],
            $deliveryType,
            $payload['address_line'],
            $payload['city'],
            $payload['notes'],
            $totals['subtotal'],
            $totals['service_fee'],
            $totals['total'],
            $status
        );
        $orderStatement->execute();
        $orderId = $db->insert_id;
        $orderStatement->close();

        $itemStatement = $db->prepare(
            'INSERT INTO order_items (
                order_id, menu_item_id, item_name, unit_price, quantity, line_total
             ) VALUES (?, ?, ?, ?, ?, ?)'
        );

        foreach ($items as $item) {
            $menuItemId = (int) $item['id'];
            $itemName = $item['name'];
            $unitPrice = (float) $item['price'];
            $quantity = (int) $item['quantity'];
            $lineTotal = (float) $item['line_total'];

            $itemStatement->bind_param(
                'iisdid',
                $orderId,
                $menuItemId,
                $itemName,
                $unitPrice,
                $quantity,
                $lineTotal
            );
            $itemStatement->execute();
        }

        $itemStatement->close();
        $db->commit();

        return $orderNumber;
    } catch (Throwable $exception) {
        $db->rollback();
        throw $exception;
    }
}

function get_order_by_number(string $orderNumber): ?array
{
    $statement = db()->prepare('SELECT * FROM orders WHERE order_number = ? LIMIT 1');
    $statement->bind_param('s', $orderNumber);
    $statement->execute();
    $result = $statement->get_result();
    $order = $result->fetch_assoc();
    $statement->close();

    if (!$order) {
        return null;
    }

    $itemStatement = db()->prepare('SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC');
    $orderId = (int) $order['id'];
    $itemStatement->bind_param('i', $orderId);
    $itemStatement->execute();
    $itemResult = $itemStatement->get_result();
    $order['items'] = $itemResult->fetch_all(MYSQLI_ASSOC);
    $itemStatement->close();

    return $order;
}

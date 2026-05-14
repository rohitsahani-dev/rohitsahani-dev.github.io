CREATE DATABASE IF NOT EXISTS la_bella_italia CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE la_bella_italia;

CREATE TABLE IF NOT EXISTS categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    sort_order INT NOT NULL DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS menu_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id INT UNSIGNED NOT NULL,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    badge VARCHAR(80) DEFAULT NULL,
    gradient_start VARCHAR(20) NOT NULL DEFAULT '#d9a066',
    gradient_end VARCHAR(20) NOT NULL DEFAULT '#7a4533',
    prep_time_minutes INT NOT NULL DEFAULT 20,
    is_featured TINYINT(1) NOT NULL DEFAULT 0,
    is_available TINYINT(1) NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_menu_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(40) NOT NULL UNIQUE,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    delivery_type ENUM('pickup', 'delivery') NOT NULL DEFAULT 'pickup',
    address_line VARCHAR(255) DEFAULT NULL,
    city VARCHAR(100) DEFAULT NULL,
    notes TEXT DEFAULT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    service_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNSIGNED NOT NULL,
    menu_item_id INT UNSIGNED NOT NULL,
    item_name VARCHAR(150) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    line_total DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_menu FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

INSERT INTO categories (name, slug, sort_order) VALUES
('Appetizers', 'appetizers', 1),
('Pasta', 'pasta', 2),
('Pizza', 'pizza', 3),
('Desserts', 'desserts', 4),
('Drinks', 'drinks', 5)
ON DUPLICATE KEY UPDATE name = VALUES(name), sort_order = VALUES(sort_order);

INSERT INTO menu_items (
    category_id, name, slug, description, price, badge,
    gradient_start, gradient_end, prep_time_minutes, is_featured, is_available, sort_order
) VALUES
((SELECT id FROM categories WHERE slug = 'appetizers'), 'Bruschetta Classica', 'bruschetta-classica', 'Grilled bread with tomato, basil, garlic, and extra virgin olive oil.', 14.00, 'Chef Favorite', '#ffc78c', '#b4552d', 10, 1, 1, 1),
((SELECT id FROM categories WHERE slug = 'appetizers'), 'Arancini Siciliani', 'arancini-siciliani', 'Golden risotto croquettes with mozzarella and rich tomato sauce.', 12.00, 'Classic', '#e6cfaa', '#946146', 12, 0, 1, 2),
((SELECT id FROM categories WHERE slug = 'appetizers'), 'Burrata al Pesto', 'burrata-al-pesto', 'Creamy burrata, basil pesto, roasted tomatoes, and focaccia.', 17.00, 'To Share', '#efd9c0', '#7c4f3a', 12, 1, 1, 3),
((SELECT id FROM categories WHERE slug = 'pasta'), 'Spaghetti Carbonara', 'spaghetti-carbonara', 'Roman-style carbonara with guanciale, pecorino romano, egg, and black pepper.', 22.00, 'Roman', '#f7d89a', '#b96e33', 18, 1, 1, 1),
((SELECT id FROM categories WHERE slug = 'pasta'), 'Lasagna Bolognese', 'lasagna-bolognese', 'Layered pasta with slow-cooked bolognese, bechamel, and parmigiano.', 25.00, 'Slow Cooked', '#f2c7a4', '#a0563d', 20, 1, 1, 2),
((SELECT id FROM categories WHERE slug = 'pasta'), 'Linguine Frutti di Mare', 'linguine-frutti-di-mare', 'Prawns, mussels, calamari, garlic, white wine, and cherry tomatoes.', 29.00, 'Seafood', '#ebd3bd', '#7f5f49', 22, 0, 1, 3),
((SELECT id FROM categories WHERE slug = 'pizza'), 'Margherita', 'margherita', 'Wood-fired pizza with San Marzano tomato, mozzarella, basil, and EVOO.', 18.00, 'Wood Fired', '#f3bb79', '#ba4134', 16, 1, 1, 1),
((SELECT id FROM categories WHERE slug = 'pizza'), 'Diavola', 'diavola', 'Spicy salami, tomato sauce, smoked provolone, and chili oil.', 21.00, 'Spicy', '#d6a070', '#913d33', 17, 0, 1, 2),
((SELECT id FROM categories WHERE slug = 'pizza'), 'Prosciutto e Funghi', 'prosciutto-e-funghi', 'Roasted mushrooms, prosciutto cotto, mozzarella, and thyme.', 23.00, 'Popular', '#e2c29a', '#74493a', 18, 0, 1, 3),
((SELECT id FROM categories WHERE slug = 'desserts'), 'Tiramisu', 'tiramisu', 'Espresso-soaked savoiardi with mascarpone cream and cocoa.', 11.00, 'House Sweet', '#e9d4ab', '#9a5a41', 8, 1, 1, 1),
((SELECT id FROM categories WHERE slug = 'desserts'), 'Panna Cotta', 'panna-cotta', 'Vanilla bean panna cotta with seasonal berries and citrus syrup.', 10.00, 'Creamy', '#f1d8a7', '#aa6449', 8, 0, 1, 2),
((SELECT id FROM categories WHERE slug = 'drinks'), 'Bellini Veneziano', 'bellini-veneziano', 'Prosecco and white peach puree served chilled.', 13.00, 'Sparkling', '#ddbf8d', '#704336', 5, 0, 1, 1),
((SELECT id FROM categories WHERE slug = 'drinks'), 'Arancia Spritz', 'arancia-spritz', 'Blood orange, tonic, rosemary, and citrus zest over ice.', 8.00, 'Zero Proof', '#d8b48c', '#8b5f4b', 5, 0, 1, 2)
ON DUPLICATE KEY UPDATE
    description = VALUES(description),
    price = VALUES(price),
    badge = VALUES(badge),
    gradient_start = VALUES(gradient_start),
    gradient_end = VALUES(gradient_end),
    prep_time_minutes = VALUES(prep_time_minutes),
    is_featured = VALUES(is_featured),
    is_available = VALUES(is_available),
    sort_order = VALUES(sort_order);

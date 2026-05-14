# XAMPP Setup

1. Copy this project folder into `C:\xampp\htdocs\la-bella-italia`.
2. Start `Apache` and `MySQL` from the XAMPP Control Panel.
3. Open `phpMyAdmin`.
4. Import [database/labella_italia.sql](C:/Users/acer/OneDrive%20-%20University%20of%20Wolverhampton/Documents/New%20project/database/labella_italia.sql).
5. Visit `http://localhost/la-bella-italia/`.

Notes:

- The PHP config uses the default XAMPP MySQL credentials:
  - host: `127.0.0.1`
  - database: `la_bella_italia`
  - user: `root`
  - password: empty
- If your MySQL password is different, update [config/app.php](C:/Users/acer/OneDrive%20-%20University%20of%20Wolverhampton/Documents/New%20project/config/app.php).
- Apache will load `index.php` automatically, so the new PHP ordering app will be used instead of the older static `index.html`.

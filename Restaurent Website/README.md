# Restaurant Management Web Application

Production-ready Flask restaurant platform with:

- customer registration and login
- bcrypt password hashing
- session-based authentication
- admin and customer roles
- dynamic menu from cloud database
- JavaScript cart and checkout flow
- order history for logged-in users
- reservation system
- admin dashboard
- CRUD for menu items, categories, users
- order status management
- image upload for menu items

## Stack

- Flask
- SQLAlchemy ORM
- PostgreSQL via Supabase or any cloud PostgreSQL provider
- HTML, CSS, Vanilla JavaScript

## Environment Setup

1. Copy `.env.example` to `.env`
2. Set `DATABASE_URL` to your cloud PostgreSQL connection string
3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Initialize the database:

```bash
flask init-db
flask seed-admin
```

5. Run locally:

```bash
flask run
```

6. Deploy with gunicorn:

```bash
gunicorn app:app
```

## Key Routes

- `/`
- `/menu`
- `/checkout`
- `/orders/history`
- `/login`
- `/register`
- `/admin/login`
- `/admin`

## API Routes

- `POST /api/register`
- `POST /api/login`
- `POST /api/logout`
- `GET|POST /api/menu`
- `PUT|DELETE /api/menu/<id>`
- `GET|POST /api/categories`
- `PUT|DELETE /api/categories/<id>`
- `GET|POST /api/orders`
- `PUT /api/orders/<id>`
- `GET|PUT|DELETE /api/users`
- `POST /api/reservations`
- `GET /api/admin/stats`

## Notes

- Use a real cloud PostgreSQL database in `DATABASE_URL`
- Set `SESSION_COOKIE_SECURE=true` in production
- Uploaded menu images are stored in `static/uploads/menu`

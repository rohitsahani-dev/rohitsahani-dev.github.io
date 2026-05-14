from __future__ import annotations

from flask import Blueprint, current_app, redirect, render_template, request, url_for
from flask_login import current_user, login_required

from backend.security import admin_required
from backend.utils import paginate
from models import Category, MenuItem, Order, Reservation, User


pages_bp = Blueprint("pages", __name__)


@pages_bp.get("/")
def home():
    featured_items = MenuItem.query.filter_by(is_available=True).order_by(MenuItem.created_at.desc()).limit(6).all()
    categories = Category.query.order_by(Category.name.asc()).all()
    return render_template(
        "pages/home.html",
        page_title=f"{current_app.config['APP_NAME']} | Restaurant Management",
        featured_items=featured_items,
        categories=categories,
    )


@pages_bp.get("/menu")
def menu():
    categories = Category.query.order_by(Category.name.asc()).all()
    menu_items = MenuItem.query.filter_by(is_available=True).order_by(MenuItem.created_at.desc()).all()
    return render_template(
        "pages/menu.html",
        page_title="Menu",
        categories=categories,
        menu_items=menu_items,
    )


@pages_bp.get("/contact")
def contact():
    return render_template("pages/contact.html", page_title="Contact")


@pages_bp.get("/reservations")
def reservations():
    return render_template("pages/reservations.html", page_title="Reservations")


@pages_bp.get("/checkout")
@login_required
def checkout():
    return render_template("pages/checkout.html", page_title="Checkout")


@pages_bp.get("/orders/history")
@login_required
def order_history():
    orders = Order.query.filter_by(user_id=current_user.id).order_by(Order.created_at.desc()).all()
    return render_template("pages/order_history.html", page_title="Order History", orders=orders)


@pages_bp.get("/admin")
@admin_required
def admin_dashboard():
    total_orders = Order.query.count()
    total_users = User.query.count()
    revenue = sum(float(order.total_price) for order in Order.query.all())
    recent_orders = Order.query.order_by(Order.created_at.desc()).limit(8).all()
    return render_template(
        "admin/dashboard.html",
        page_title="Admin Dashboard",
        total_orders=total_orders,
        total_users=total_users,
        revenue=revenue,
        recent_orders=recent_orders,
    )


@pages_bp.get("/admin/menu")
@admin_required
def admin_menu():
    search = (request.args.get("search") or "").strip()
    category_id = request.args.get("category_id", type=int)

    query = MenuItem.query.order_by(MenuItem.created_at.desc())
    if search:
        query = query.filter(MenuItem.name.ilike(f"%{search}%"))
    if category_id:
        query = query.filter_by(category_id=category_id)

    pagination = paginate(query)
    categories = Category.query.order_by(Category.name.asc()).all()

    return render_template(
        "admin/menu.html",
        page_title="Manage Menu",
        pagination=pagination,
        categories=categories,
        search=search,
        selected_category_id=category_id,
    )


@pages_bp.get("/admin/categories")
@admin_required
def admin_categories():
    categories = Category.query.order_by(Category.name.asc()).all()
    return render_template("admin/categories.html", page_title="Manage Categories", categories=categories)


@pages_bp.get("/admin/orders")
@admin_required
def admin_orders():
    status = (request.args.get("status") or "").strip()
    query = Order.query.order_by(Order.created_at.desc())
    if status:
        query = query.filter_by(status=status)
    pagination = paginate(query)
    return render_template("admin/orders.html", page_title="Manage Orders", pagination=pagination, selected_status=status)


@pages_bp.get("/admin/users")
@admin_required
def admin_users():
    search = (request.args.get("search") or "").strip()
    query = User.query.order_by(User.created_at.desc())
    if search:
        query = query.filter((User.name.ilike(f"%{search}%")) | (User.email.ilike(f"%{search}%")))
    pagination = paginate(query)
    return render_template("admin/users.html", page_title="Manage Users", pagination=pagination, search=search)


@pages_bp.get("/admin/reservations")
@admin_required
def admin_reservations():
    reservations = Reservation.query.order_by(Reservation.reservation_at.desc()).limit(50).all()
    return render_template("admin/reservations.html", page_title="Reservations", reservations=reservations)

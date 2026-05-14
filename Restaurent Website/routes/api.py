from __future__ import annotations

from datetime import datetime

from flask import Blueprint, jsonify, request
from flask_login import current_user
from sqlalchemy import func

from backend.extensions import db
from backend.security import admin_json_required, login_json_required, validate_csrf
from backend.utils import get_request_payload, paginate, parse_decimal, save_uploaded_image
from models import Category, MenuItem, Order, OrderItem, Reservation, User


api_bp = Blueprint("api", __name__)


def error_response(message: str, status_code: int = 400, extra: dict | None = None):
    payload = {"error": message}
    if extra:
        payload.update(extra)
    return jsonify(payload), status_code


@api_bp.get("/api/menu")
def api_get_menu():
    search = (request.args.get("search") or "").strip()
    category_id = request.args.get("category_id", type=int)

    query = MenuItem.query.join(Category).filter(MenuItem.is_available.is_(True)).order_by(MenuItem.created_at.desc())

    if search:
        query = query.filter(MenuItem.name.ilike(f"%{search}%"))
    if category_id:
        query = query.filter(MenuItem.category_id == category_id)

    items = [item.to_dict() for item in query.all()]
    return jsonify({"data": items})


@api_bp.post("/api/menu")
@admin_json_required
def api_create_menu_item():
    validate_csrf()

    form = request.form if request.form else get_request_payload()
    errors = {}

    name = (form.get("name") or "").strip()
    description = (form.get("description") or "").strip()
    category_id = form.get("category_id")
    is_available = str(form.get("is_available") or "true").lower() in {"true", "1", "on", "yes"}

    if len(name) < 2:
        errors["name"] = "Name must be at least 2 characters."
    if len(description) < 10:
        errors["description"] = "Description must be at least 10 characters."

    try:
        price = parse_decimal(form.get("price"), "Price")
    except ValueError as exc:
        errors["price"] = str(exc)
        price = None

    category = Category.query.get(int(category_id)) if category_id and str(category_id).isdigit() else None
    if not category:
        errors["category_id"] = "A valid category is required."

    image_url = None
    if "image" in request.files and request.files["image"].filename:
        try:
            image_url = save_uploaded_image(request.files["image"])
        except ValueError as exc:
            errors["image"] = str(exc)

    if errors:
        return jsonify({"errors": errors}), 422

    menu_item = MenuItem(
        name=name,
        description=description,
        price=price,
        category=category,
        image_url=image_url or (form.get("image_url") or "").strip() or None,
        is_available=is_available,
    )
    db.session.add(menu_item)
    db.session.commit()

    return jsonify({"message": "Menu item created.", "data": menu_item.to_dict()}), 201


@api_bp.put("/api/menu/<int:item_id>")
@admin_json_required
def api_update_menu_item(item_id: int):
    validate_csrf()
    menu_item = MenuItem.query.get_or_404(item_id)

    form = request.form if request.form else get_request_payload()
    errors = {}

    name = (form.get("name") or menu_item.name).strip()
    description = (form.get("description") or menu_item.description).strip()
    category_id = form.get("category_id", menu_item.category_id)
    is_available = str(form.get("is_available") or menu_item.is_available).lower() in {"true", "1", "on", "yes"}

    if len(name) < 2:
        errors["name"] = "Name must be at least 2 characters."
    if len(description) < 10:
        errors["description"] = "Description must be at least 10 characters."

    try:
        price = parse_decimal(form.get("price", menu_item.price), "Price")
    except ValueError as exc:
        errors["price"] = str(exc)
        price = None

    category = Category.query.get(int(category_id)) if category_id and str(category_id).isdigit() else None
    if not category:
        errors["category_id"] = "A valid category is required."

    if "image" in request.files and request.files["image"].filename:
        try:
            menu_item.image_url = save_uploaded_image(request.files["image"])
        except ValueError as exc:
            errors["image"] = str(exc)
    elif (form.get("image_url") or "").strip():
        menu_item.image_url = (form.get("image_url") or "").strip()

    if errors:
        return jsonify({"errors": errors}), 422

    menu_item.name = name
    menu_item.description = description
    menu_item.price = price
    menu_item.category = category
    menu_item.is_available = is_available
    db.session.commit()

    return jsonify({"message": "Menu item updated.", "data": menu_item.to_dict()})


@api_bp.put("/api/menu")
@admin_json_required
def api_update_menu_item_collection():
    payload = request.form if request.form else get_request_payload()
    item_id = int(payload.get("id", 0))
    if item_id <= 0:
        return error_response("Menu item id is required.", 422)
    return api_update_menu_item(item_id)


@api_bp.delete("/api/menu/<int:item_id>")
@admin_json_required
def api_delete_menu_item(item_id: int):
    validate_csrf()
    menu_item = MenuItem.query.get_or_404(item_id)
    db.session.delete(menu_item)
    db.session.commit()
    return jsonify({"message": "Menu item deleted."})


@api_bp.delete("/api/menu")
@admin_json_required
def api_delete_menu_item_collection():
    validate_csrf()
    payload = get_request_payload()
    item_id = int(payload.get("id", 0))
    if item_id <= 0:
        return error_response("Menu item id is required.", 422)
    menu_item = MenuItem.query.get_or_404(item_id)
    db.session.delete(menu_item)
    db.session.commit()
    return jsonify({"message": "Menu item deleted."})


@api_bp.get("/api/categories")
def api_get_categories():
    categories = Category.query.order_by(Category.name.asc()).all()
    return jsonify({"data": [category.to_dict(include_count=True) for category in categories]})


@api_bp.post("/api/categories")
@admin_json_required
def api_create_category():
    validate_csrf()
    payload = get_request_payload()
    name = (payload.get("name") or "").strip()
    if len(name) < 2:
        return error_response("Category name must be at least 2 characters.", 422)
    if Category.query.filter(func.lower(Category.name) == name.lower()).first():
        return error_response("Category already exists.", 422)

    category = Category(name=name)
    db.session.add(category)
    db.session.commit()
    return jsonify({"message": "Category created.", "data": category.to_dict(include_count=True)}), 201


@api_bp.put("/api/categories/<int:category_id>")
@admin_json_required
def api_update_category(category_id: int):
    validate_csrf()
    category = Category.query.get_or_404(category_id)
    payload = get_request_payload()
    name = (payload.get("name") or "").strip()
    if len(name) < 2:
        return error_response("Category name must be at least 2 characters.", 422)
    category.name = name
    db.session.commit()
    return jsonify({"message": "Category updated.", "data": category.to_dict(include_count=True)})


@api_bp.delete("/api/categories/<int:category_id>")
@admin_json_required
def api_delete_category(category_id: int):
    validate_csrf()
    category = Category.query.get_or_404(category_id)
    if category.menu_items.count() > 0:
        return error_response("Delete or reassign menu items before removing this category.", 409)
    db.session.delete(category)
    db.session.commit()
    return jsonify({"message": "Category deleted."})


@api_bp.get("/api/orders")
@login_json_required
def api_get_orders():
    status = (request.args.get("status") or "").strip()

    if current_user.role == "admin":
        query = Order.query.order_by(Order.created_at.desc())
    else:
        query = Order.query.filter_by(user_id=current_user.id).order_by(Order.created_at.desc())

    if status:
        query = query.filter(Order.status == status)

    pagination = paginate(query)
    return jsonify(
        {
            "data": [order.to_dict(include_items=current_user.role != "admin") for order in pagination.items],
            "pagination": {
                "page": pagination.page,
                "pages": pagination.pages,
                "total": pagination.total,
                "per_page": pagination.per_page,
            },
        }
    )


@api_bp.post("/api/orders")
@login_json_required
def api_create_order():
    validate_csrf()
    payload = get_request_payload()
    items = payload.get("items") or []

    if not isinstance(items, list) or not items:
        return error_response("At least one order item is required.", 422)

    order_items = []
    total_price = 0

    for entry in items:
        menu_item_id = int(entry.get("menu_item_id", 0))
        quantity = int(entry.get("quantity", 0))
        if menu_item_id <= 0 or quantity <= 0:
            return error_response("Each order item must include a valid menu_item_id and quantity.", 422)

        menu_item = MenuItem.query.filter_by(id=menu_item_id, is_available=True).first()
        if not menu_item:
            return error_response(f"Menu item {menu_item_id} is unavailable.", 422)

        line_total = menu_item.price * quantity
        total_price += line_total
        order_items.append(
            OrderItem(
                menu_item=menu_item,
                quantity=quantity,
                unit_price=menu_item.price,
            )
        )

    order = Order(user=current_user, total_price=total_price, status="Pending")
    db.session.add(order)
    db.session.flush()

    for item in order_items:
        item.order = order
        db.session.add(item)

    db.session.commit()
    return jsonify({"message": "Order placed successfully.", "data": order.to_dict()}), 201


@api_bp.put("/api/orders/<int:order_id>")
@admin_json_required
def api_update_order(order_id: int):
    validate_csrf()
    order = Order.query.get_or_404(order_id)
    payload = get_request_payload()
    status = (payload.get("status") or "").strip()

    if status not in {"Pending", "Preparing", "Delivered"}:
        return error_response("Status must be Pending, Preparing, or Delivered.", 422)

    order.status = status
    db.session.commit()
    return jsonify({"message": "Order status updated.", "data": order.to_dict()})


@api_bp.put("/api/orders")
@admin_json_required
def api_update_order_collection():
    validate_csrf()
    payload = get_request_payload()
    order_id = int(payload.get("id", 0))
    if order_id <= 0:
        return error_response("Order id is required.", 422)
    order = Order.query.get_or_404(order_id)
    status = (payload.get("status") or "").strip()
    if status not in {"Pending", "Preparing", "Delivered"}:
        return error_response("Status must be Pending, Preparing, or Delivered.", 422)
    order.status = status
    db.session.commit()
    return jsonify({"message": "Order status updated.", "data": order.to_dict()})


@api_bp.get("/api/users")
@admin_json_required
def api_get_users():
    search = (request.args.get("search") or "").strip()
    query = User.query.order_by(User.created_at.desc())
    if search:
        query = query.filter(
            (User.name.ilike(f"%{search}%")) |
            (User.email.ilike(f"%{search}%"))
        )

    pagination = paginate(query)
    return jsonify(
        {
            "data": [user.to_dict() for user in pagination.items],
            "pagination": {
                "page": pagination.page,
                "pages": pagination.pages,
                "total": pagination.total,
                "per_page": pagination.per_page,
            },
        }
    )


@api_bp.put("/api/users/<int:user_id>")
@admin_json_required
def api_update_user(user_id: int):
    validate_csrf()
    user = User.query.get_or_404(user_id)
    payload = get_request_payload()

    name = (payload.get("name") or user.name).strip()
    role = (payload.get("role") or user.role).strip().lower()

    if role not in {"admin", "customer"}:
        return error_response("Role must be admin or customer.", 422)
    if len(name) < 2:
        return error_response("Name must be at least 2 characters.", 422)

    user.name = name
    user.role = role
    db.session.commit()
    return jsonify({"message": "User updated.", "data": user.to_dict()})


@api_bp.put("/api/users")
@admin_json_required
def api_update_user_collection():
    validate_csrf()
    payload = get_request_payload()
    user_id = int(payload.get("id", 0))
    if user_id <= 0:
        return error_response("User id is required.", 422)
    user = User.query.get_or_404(user_id)
    name = (payload.get("name") or user.name).strip()
    role = (payload.get("role") or user.role).strip().lower()
    if role not in {"admin", "customer"}:
        return error_response("Role must be admin or customer.", 422)
    if len(name) < 2:
        return error_response("Name must be at least 2 characters.", 422)
    user.name = name
    user.role = role
    db.session.commit()
    return jsonify({"message": "User updated.", "data": user.to_dict()})


@api_bp.delete("/api/users/<int:user_id>")
@admin_json_required
def api_delete_user(user_id: int):
    validate_csrf()
    user = User.query.get_or_404(user_id)
    if user.id == current_user.id:
        return error_response("You cannot delete your own admin account.", 409)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted."})


@api_bp.delete("/api/users")
@admin_json_required
def api_delete_user_collection():
    validate_csrf()
    payload = get_request_payload()
    user_id = int(payload.get("id", 0))
    if user_id <= 0:
        return error_response("User id is required.", 422)
    user = User.query.get_or_404(user_id)
    if user.id == current_user.id:
        return error_response("You cannot delete your own admin account.", 409)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted."})


@api_bp.post("/api/reservations")
def api_create_reservation():
    validate_csrf()
    payload = get_request_payload()

    name = (payload.get("name") or "").strip()
    email = (payload.get("email") or "").strip().lower()
    phone = (payload.get("phone") or "").strip()
    party_size = int(payload.get("party_size", 0))
    reservation_at_raw = (payload.get("reservation_at") or "").strip()
    notes = (payload.get("notes") or "").strip() or None

    errors = {}
    if len(name) < 2:
        errors["name"] = "Name must be at least 2 characters."
    if "@" not in email:
        errors["email"] = "Enter a valid email address."
    if len(phone) < 7:
        errors["phone"] = "Enter a valid phone number."
    if party_size <= 0:
        errors["party_size"] = "Party size must be at least 1."

    try:
        reservation_at = datetime.fromisoformat(reservation_at_raw)
    except ValueError:
        errors["reservation_at"] = "Reservation date/time is invalid."
        reservation_at = None

    if errors:
        return jsonify({"errors": errors}), 422

    reservation = Reservation(
        user=current_user if current_user.is_authenticated else None,
        name=name,
        email=email,
        phone=phone,
        party_size=party_size,
        reservation_at=reservation_at,
        notes=notes,
    )
    db.session.add(reservation)
    db.session.commit()
    return jsonify({"message": "Reservation submitted successfully.", "data": reservation.to_dict()}), 201


@api_bp.get("/api/admin/stats")
@admin_json_required
def api_admin_stats():
    total_orders = db.session.scalar(db.select(func.count(Order.id))) or 0
    total_users = db.session.scalar(db.select(func.count(User.id))) or 0
    revenue = db.session.scalar(db.select(func.coalesce(func.sum(Order.total_price), 0))) or 0
    pending_orders = db.session.scalar(db.select(func.count(Order.id)).where(Order.status == "Pending")) or 0

    return jsonify(
        {
            "data": {
                "total_orders": int(total_orders),
                "total_users": int(total_users),
                "revenue": float(revenue),
                "pending_orders": int(pending_orders),
            }
        }
    )

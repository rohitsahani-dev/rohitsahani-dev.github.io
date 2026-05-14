from __future__ import annotations

from flask import Blueprint, jsonify, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user

from backend.extensions import db
from backend.security import validate_csrf
from backend.utils import get_request_payload
from models import User


auth_bp = Blueprint("auth", __name__)


@auth_bp.get("/login")
def login_page():
    if current_user.is_authenticated:
        return redirect(url_for("pages.home"))
    return render_template("auth/login.html", page_title="Login")


@auth_bp.get("/register")
def register_page():
    if current_user.is_authenticated:
        return redirect(url_for("pages.home"))
    return render_template("auth/register.html", page_title="Register")


@auth_bp.get("/admin/login")
def admin_login_page():
    if current_user.is_authenticated and current_user.role == "admin":
        return redirect(url_for("pages.admin_dashboard"))
    return render_template("auth/admin_login.html", page_title="Admin Login")


@auth_bp.post("/api/register")
def api_register():
    validate_csrf()
    payload = get_request_payload()

    name = (payload.get("name") or "").strip()
    email = (payload.get("email") or "").strip().lower()
    password = payload.get("password") or ""
    confirm_password = payload.get("confirm_password") or ""

    errors = {}
    if len(name) < 2:
        errors["name"] = "Name must be at least 2 characters."
    if "@" not in email or len(email) > 255:
        errors["email"] = "Enter a valid email address."
    if len(password) < 8:
        errors["password"] = "Password must be at least 8 characters."
    if password != confirm_password:
        errors["confirm_password"] = "Passwords do not match."
    if User.query.filter_by(email=email).first():
        errors["email"] = "An account with this email already exists."

    if errors:
        return jsonify({"errors": errors}), 422

    user = User(name=name, email=email, role="customer")
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    login_user(user)

    return jsonify(
        {
            "message": "Registration successful.",
            "user": user.to_dict(),
            "redirect_url": url_for("pages.home"),
        }
    ), 201


@auth_bp.post("/api/login")
def api_login():
    validate_csrf()
    payload = get_request_payload()

    email = (payload.get("email") or "").strip().lower()
    password = payload.get("password") or ""
    remember = str(payload.get("remember") or "").lower() in {"true", "1", "on", "yes"}
    expected_role = (payload.get("expected_role") or "").strip().lower()

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password."}), 401

    if expected_role == "admin" and user.role != "admin":
        return jsonify({"error": "Admin access required."}), 403

    login_user(user, remember=remember)

    redirect_url = url_for("pages.admin_dashboard") if user.role == "admin" and expected_role == "admin" else url_for("pages.home")
    return jsonify(
        {
            "message": "Login successful.",
            "user": user.to_dict(),
            "redirect_url": redirect_url,
        }
    )


@auth_bp.post("/api/logout")
@login_required
def api_logout():
    validate_csrf()
    logout_user()
    return jsonify({"message": "Logged out successfully.", "redirect_url": url_for("pages.home")})

from __future__ import annotations

import secrets
from functools import wraps

from flask import abort, current_app, jsonify, request, session
from flask_login import current_user, login_required


def csrf_token() -> str:
    token = session.get("_csrf_token")
    if not token:
        token = secrets.token_hex(32)
        session["_csrf_token"] = token
    return token


def validate_csrf() -> None:
    if request.method in {"GET", "HEAD", "OPTIONS"}:
        return

    token = request.headers.get("X-CSRF-Token") or request.form.get("csrf_token")
    if not token or token != session.get("_csrf_token"):
        abort(400, description="Invalid CSRF token.")


def login_json_required(view_func):
    @wraps(view_func)
    def wrapped(*args, **kwargs):
        if not current_user.is_authenticated:
            return jsonify({"error": "Authentication required."}), 401
        return view_func(*args, **kwargs)

    return wrapped


def admin_required(view_func):
    @wraps(view_func)
    @login_required
    def wrapped(*args, **kwargs):
        if current_user.role != "admin":
            abort(403)
        return view_func(*args, **kwargs)

    return wrapped


def admin_json_required(view_func):
    @wraps(view_func)
    def wrapped(*args, **kwargs):
        if not current_user.is_authenticated:
            return jsonify({"error": "Authentication required."}), 401
        if current_user.role != "admin":
            return jsonify({"error": "Admin access required."}), 403
        return view_func(*args, **kwargs)

    return wrapped


def inject_current_year() -> int:
    return __import__("datetime").datetime.utcnow().year

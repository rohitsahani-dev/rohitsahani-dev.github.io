from __future__ import annotations

import os
import uuid
from decimal import Decimal, InvalidOperation
from pathlib import Path

from flask import current_app, request
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename


ALLOWED_IMAGE_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}


def get_request_payload() -> dict:
    if request.is_json:
        return request.get_json(silent=True) or {}
    return request.form.to_dict()


def parse_decimal(value, field_name: str) -> Decimal:
    try:
        decimal_value = Decimal(str(value))
    except (InvalidOperation, TypeError):
        raise ValueError(f"{field_name} must be a valid number.")

    if decimal_value < 0:
        raise ValueError(f"{field_name} must be greater than or equal to zero.")

    return decimal_value


def paginate(query, default_per_page: int | None = None):
    page = request.args.get("page", default=1, type=int)
    per_page = request.args.get("per_page", default=default_per_page or current_app.config["PER_PAGE"], type=int)
    per_page = min(max(per_page, 1), 100)
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    return pagination


def save_uploaded_image(file: FileStorage | None) -> str | None:
    if not file or not file.filename:
        return None

    extension = file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else ""
    if extension not in ALLOWED_IMAGE_EXTENSIONS:
        raise ValueError("Only png, jpg, jpeg, and webp image formats are allowed.")

    filename = secure_filename(file.filename)
    unique_name = f"{uuid.uuid4().hex}_{filename}"
    upload_folder = Path(current_app.config["UPLOAD_FOLDER"])
    upload_folder.mkdir(parents=True, exist_ok=True)
    destination = upload_folder / unique_name
    file.save(destination)

    relative_folder = os.path.relpath(upload_folder, current_app.static_folder).replace("\\", "/")
    return f"/static/{relative_folder}/{unique_name}"

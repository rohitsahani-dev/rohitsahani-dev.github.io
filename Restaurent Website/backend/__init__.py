from __future__ import annotations

from pathlib import Path

from flask import Flask, jsonify, render_template, request

from backend.config import Config
from backend.extensions import bcrypt, cors, db, login_manager, migrate
from backend.security import csrf_token, inject_current_year


def create_app() -> Flask:
    app = Flask(__name__, template_folder="../templates", static_folder="../static")
    app.config.from_object(Config)

    upload_path = Path(app.config["UPLOAD_FOLDER"])
    upload_path.mkdir(parents=True, exist_ok=True)

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    cors.init_app(
        app,
        resources={r"/api/*": {"origins": app.config["CORS_ALLOWED_ORIGINS"]}},
        supports_credentials=True,
    )

    app.context_processor(lambda: {"csrf_token": csrf_token, "current_year": inject_current_year()})

    from routes.auth import auth_bp
    from routes.api import api_bp
    from routes.pages import pages_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(api_bp)
    app.register_blueprint(pages_bp)

    register_error_handlers(app)
    register_cli_commands(app)

    return app


def register_error_handlers(app: Flask) -> None:
    @app.errorhandler(404)
    def handle_not_found(error):  # noqa: ANN001
        if request.path.startswith("/api/"):
            return jsonify({"error": "Resource not found."}), 404
        return render_template("pages/not_found.html", page_title="Page Not Found"), 404

    @app.errorhandler(413)
    def handle_file_too_large(error):  # noqa: ANN001
        if request.path.startswith("/api/"):
            return jsonify({"error": "Uploaded file is too large."}), 413
        return "Uploaded file is too large.", 413

    @app.errorhandler(500)
    def handle_server_error(error):  # noqa: ANN001
        if request.path.startswith("/api/"):
            return jsonify({"error": "Internal server error."}), 500
        return render_template("pages/not_found.html", page_title="Server Error"), 500


def register_cli_commands(app: Flask) -> None:
    from models import Category, User

    @app.cli.command("init-db")
    def init_db_command() -> None:
        db.create_all()
        print("Database tables created.")

    @app.cli.command("seed-admin")
    def seed_admin_command() -> None:
        db.create_all()

        email = os.getenv("DEFAULT_ADMIN_EMAIL")
        password = os.getenv("DEFAULT_ADMIN_PASSWORD")
        name = os.getenv("DEFAULT_ADMIN_NAME", "Restaurant Admin")

        if not email or not password:
            print("Set DEFAULT_ADMIN_EMAIL and DEFAULT_ADMIN_PASSWORD in .env before seeding an admin.")
            return

        existing = User.query.filter_by(email=email.lower().strip()).first()
        if existing:
            print("Admin already exists.")
            return

        admin_user = User(name=name.strip(), email=email.lower().strip(), role="admin")
        admin_user.set_password(password)
        db.session.add(admin_user)

        default_categories = [
            "Starters",
            "Main Course",
            "Drinks",
            "Desserts",
        ]
        for category_name in default_categories:
            if not Category.query.filter_by(name=category_name).first():
                db.session.add(Category(name=category_name))

        db.session.commit()
        print("Admin user and default categories created.")

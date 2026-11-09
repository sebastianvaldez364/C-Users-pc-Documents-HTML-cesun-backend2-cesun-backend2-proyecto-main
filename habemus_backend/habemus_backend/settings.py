"""
Django settings for habemus_backend project.

Configuración principal del backend de Habemus Classroom.

El backend utiliza Django y Django REST Framework para crear
una API que posteriormente será consumida por el frontend
desarrollado con React.
"""

from pathlib import Path


# ==========================================================
# RUTAS DEL PROYECTO
# ==========================================================

BASE_DIR = Path(__file__).resolve().parent.parent


# ==========================================================
# CONFIGURACIÓN GENERAL
# ==========================================================

SECRET_KEY = "django-insecure-pm^ps&t6w_uoxtg)amj(226&g%$$bxay_(ohh7ts3&iy=nkprx"

# Activado únicamente durante el desarrollo.
DEBUG = True

ALLOWED_HOSTS = []


# ==========================================================
# APLICACIONES INSTALADAS
# ==========================================================

INSTALLED_APPS = [

    # Aplicaciones incluidas con Django.
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Permite crear APIs REST que serán consumidas por React.
    "rest_framework",
    "rest_framework.authtoken",

    # Permite que React y Django se comuniquen
    # aunque estén ejecutándose en puertos diferentes.
    "corsheaders",

    # Aplicación de Habemus Classroom encargada de los cursos,
    # horarios, materiales y recursos de apoyo.
    "cursos",

    # Aplicación de Habemus Classroom encargada de las tareas.
    "tareas",
]


# ==========================================================
# MIDDLEWARE
# ==========================================================

MIDDLEWARE = [

    "django.middleware.security.SecurityMiddleware",

    # Middleware necesario para permitir las peticiones
    # provenientes del frontend de React.
    "corsheaders.middleware.CorsMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# ==========================================================
# CONFIGURACIÓN DE URLS
# ==========================================================

ROOT_URLCONF = "habemus_backend.urls"


# ==========================================================
# TEMPLATES
# ==========================================================

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",

        "DIRS": [],

        "APP_DIRS": True,

        "OPTIONS": {

            "context_processors": [

                "django.template.context_processors.request",

                "django.contrib.auth.context_processors.auth",

                "django.contrib.messages.context_processors.messages",

            ],

        },

    },
]


# ==========================================================
# WSGI
# ==========================================================

WSGI_APPLICATION = "habemus_backend.wsgi.application"


# ==========================================================
# BASE DE DATOS
# ==========================================================

# Durante esta etapa utilizamos SQLite.
#
# Django crea automáticamente el archivo db.sqlite3.
# Posteriormente podríamos cambiar a PostgreSQL sin
# modificar el frontend de React.

DATABASES = {

    "default": {

        "ENGINE": "django.db.backends.sqlite3",

        "NAME": BASE_DIR / "db.sqlite3",

    }

}


# ==========================================================
# VALIDACIÓN DE CONTRASEÑAS
# ==========================================================

AUTH_PASSWORD_VALIDATORS = [

    {
        "NAME":
        "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },

    {
        "NAME":
        "django.contrib.auth.password_validation.MinimumLengthValidator",
    },

    {
        "NAME":
        "django.contrib.auth.password_validation.CommonPasswordValidator",
    },

    {
        "NAME":
        "django.contrib.auth.password_validation.NumericPasswordValidator",
    },

]


# ==========================================================
# INTERNACIONALIZACIÓN
# ==========================================================

# Configuramos el proyecto para español.
LANGUAGE_CODE = "es-mx"

# Zona horaria utilizada por Habemus Classroom.
TIME_ZONE = "America/Tijuana"

USE_I18N = True

USE_TZ = True


# ==========================================================
# ARCHIVOS ESTÁTICOS
# ==========================================================

STATIC_URL = "static/"


# ==========================================================
# CONFIGURACIÓN CORS
# ==========================================================

# React y Django funcionan en servidores diferentes
# durante el desarrollo:
#
# React:
# http://localhost:5173
#
# Django:
# http://127.0.0.1:8000
#
# Estas direcciones permiten que React pueda realizar
# peticiones HTTP hacia nuestra API de Django.

CORS_ALLOWED_ORIGINS = [

    "http://localhost:5173",

    "http://127.0.0.1:5173",

]


# ==========================================================
# DJANGO REST FRAMEWORK
# ==========================================================

# Configuración inicial de la API.
#
# Por ahora no requerimos autenticación porque estamos
# desarrollando el primer avance del proyecto.

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}
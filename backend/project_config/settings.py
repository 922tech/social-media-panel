import os
import sys
from datetime import timedelta
from pathlib import Path
from cryptography.fernet import Fernet

import sentry_sdk
from django.utils.translation import gettext_lazy as _
from redis import Redis
from sentry_sdk.integrations.celery import CeleryIntegration
from sentry_sdk.integrations.django import DjangoIntegration

# for debugging tests
if 'test' in sys.argv:
    from dotenv import load_dotenv
    load_dotenv()

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

PROJECT_NAME = 'social_media_panel'
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY', default='django-insecure-l8(o4x($j-$$zy4p169^v(ol@=x=t=%nr(^%lb9m@!s72c1g&u')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(int(os.getenv('DEBUG', default='1')))

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', default='localhost,127.0.0.1').split(',')
SITE_URL = os.environ.get('SITE_URL', '127.0.0.1')
VERSION = os.getenv('VERSION', default='1.0.0')

AUTH_USER_MODEL = 'user.User'

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework_simplejwt',
    'django_filters',
    'django_redis',
    'rest_framework',
    'pymemcache',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'project_config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'project_config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

MONGO_USER = os.getenv('MONGO_INITDB_ROOT_USERNAME', default='admin')
MONGO_PASSWORD = os.getenv('MONGO_INITDB_ROOT_PASSWORD', default='admin')
MONGO_DB = os.getenv('MONGO_INITDB_DB_NAME', default=PROJECT_NAME)
MONGO_HOST = os.getenv('MONGO_INITDB_HOST', default='localhost')
MONGO_PORT = int(os.getenv('MONGO_INITDB_ROOT_PORT', default=27017))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.getenv('POSTGRES_DB', PROJECT_NAME),
        'USER': os.getenv('POSTGRES_USER', 'postgres'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD', '123'),
        'HOST': os.getenv('POSTGRES_HOST', 'localhost'),
        'PORT': int(os.getenv('POSTGRES_PORT', '5432')),
    },
    'document': {
        'ENGINE': 'djongo',
        'ENFORCE_SCHEMA': False,
        'LOGGING': {
            'version': 1,
            'loggers': {
                'djongo': {
                    'level': 'DEBUG',
                    'propagate': False,
                }
            },
        },
        'CLIENT': {
            'host': MONGO_HOST,
            'port': MONGO_PORT,
            'username': MONGO_USER,
            'password': MONGO_PASSWORD,
            'authSource': 'admin',
        },
        'NAME': MONGO_DB,
    }
}

REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.URLPathVersioning',
    'DEFAULT_VERSION': 'v0',
    'ALLOWED_VERSIONS': os.environ.get('REST_FRAMEWORK_ALLOWED_VERSIONS', default='v0,v1').split(','),
    'DEFAULT_PAGINATION_CLASS': 'applications.common.paginator.ResponsePaginator',
    'PAGE_SIZE': os.getenv('PAGE_SIZE', 100),
    'DEFAULT_FILTER_BACKENDS': (
        'rest_framework.filters.SearchFilter',
    ),
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': os.getenv("ANON_THROTTLE_RATES", '1000/hour'),
        'user': os.getenv("USER_THROTTLE_RATES", '1000/hour')
    },
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

LANGUAGES = [
    ('en', _('En')),
    ('fa', _('Fa')),
]

LOCALE_PATHS = (os.path.join(BASE_DIR, "locale"),)

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

sentry_sdk.init(
    dsn=os.getenv('SENTRY_DNS', default="https://<key>@sentry.io/12"),
    integrations=[DjangoIntegration(), CeleryIntegration()],
    traces_sample_rate=float(os.getenv('SENTRY_RATE', default=1.0)),
    send_default_pii=bool(int(os.getenv('SENTRY_SEND_DEFAULT_PII', default=1))),
    release=VERSION,
    server_name=PROJECT_NAME,
)
# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

# CELERY
BROKER_URL = os.getenv("CELERY_BROKER_URL", default='redis://localhost:6379')
CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND", default='redis://localhost:6379')
CELERY_ACCEPT_CONTENT = ['application/json', 'application/x-python-serialize']
CELERY_TASK_SERIALIZER = 'pickle'
CELERY_RESULT_SERIALIZER = 'pickle'
CELERY_TIMEZONE = TIME_ZONE
USE_CELERY = bool(os.getenv('USE_CELERY', default=False))

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.PyMemcacheCache',
        'LOCATION': os.getenv('CACHES_MEMCACHED_HOST', default='127.0.0.1:11211'),
        'TIMEOUT': int(os.getenv('MEMCACHED_TIMEOUT', default='3600')),
    }
}


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


REDIS_CLIENT = Redis(
    host=os.getenv("REDIS_HOST", default='localhost'),
    # password=os.getenv("REDIS_PASSWORD", default=''),
    port=int(os.getenv("REDIS_PORT", default=6379)),
    db=int(os.getenv("REDIS_DB", default=0)),
)
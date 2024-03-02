import sentry_sdk
from django.conf import settings
from django.core.cache import cache
from django.db import connections
from pymongo import MongoClient


def app():
    application = 1
    return application


def database():
    # Postgres
    postgres = 0
    try:
        db_conn = connections['default']
        db_conn.cursor()
        postgres = 1

    except Exception as e:
        sentry_sdk.capture_event({"postgres": "Postgres Server not available"})
        sentry_sdk.capture_exception(e)
        print(">>>", "Postgres not available")

    if postgres:
        return 1
    else:
        return 0


def archive_database():
    mongo = 0
    try:
        conn = settings.DATABASES['document']
        connection = MongoClient(host=conn['CLIENT']['host'])
        if connection:
            mongo = 1
    except Exception as e:
        sentry_sdk.capture_event({"mongodb": "Mongodb Server not available"})
        sentry_sdk.capture_exception(e)
        print(">>>", "Archive Database not available")
    return mongo


def redis():
    return int(settings.REDIS_CLIENT.ping())


def memcached():
    try:
        cache.set('CACHE_STATUS', 1)
        memcached_check = cache.get('CACHE_STATUS')
        if memcached_check:
            return 1
    except Exception as e:
        sentry_sdk.capture_exception(e)
        print(">>>", f"memcached Server not available because {e}")
    return 0

from __future__ import absolute_import

import os

from celery import Celery
from celery.schedules import crontab
from django.conf import settings
from dotenv import load_dotenv

load_dotenv()

app = Celery(os.environ.get('PROJECT_NAME'))

app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
app.conf.beat_schedule = {
    "every day at 12 AM": {
        "task": "update_ip_location_enabled",
        "schedule": crontab(hour=0,
                            minute=0)
    },
}

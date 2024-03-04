import json

from django.conf import settings
from django.test import TestCase
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status

class HealthTestCase(TestCase):

    def setUp(self):
        self.client = Client()

    def tearDown(self) -> None:
        pass

    def test_get_health_text_success(self):
        """
        Test the get health api
        """
        response = self.client.get(reverse("health-text", args=("v0",)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = response.content.decode()
        self.assertEqual(response,
                         'medrick_app 1\nmedrick_db 1\nmedrick_redis 1\nmedrick_memcached 1\nmedrick_mongo_db 1')

    def test_get_health_json_success(self):
        """
        Test the get health (json version) api
        """
        response = self.client.get(reverse("health-json", args=("v0",)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = json.loads(response.content.decode())
        self.assertEqual(response, {
            'project_name': settings.PROJECT_NAME,
            "version": settings.VERSION,
            "app": True,
            "database": True,
            "redis": True,
            "memcached": True,
            "archive_database": True,
        })



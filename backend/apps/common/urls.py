from rest_framework import routers

from .views import HealthViewSet

router = routers.DefaultRouter()

router.register('common/health', HealthViewSet, basename='health')

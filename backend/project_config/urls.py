from django.contrib import admin
from django.shortcuts import redirect
from django.urls import path, include
from rest_framework import routers
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.conf import settings

from apps.common.urls import router as common_router
router = routers.DefaultRouter()
router.registry.extend(common_router.registry)

urlpatterns = [
    path('', lambda request: redirect('admin/', permanent=True)),
    path('admin/', admin.site.urls),
    path('auth-api/', include('rest_framework.urls')),
    path('<version>/api/', include(router.urls)),
]

urlpatterns += i18n_patterns(
    path('admin/doc/', include('django.contrib.admindocs.urls')),
    path('admin/', admin.site.urls),
)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

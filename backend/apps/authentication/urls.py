from django.urls import path
from .views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('login', TokenObtainPairView.as_view()),
    path('refresh', TokenRefreshView.as_view()),
]

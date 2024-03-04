"""
For further potential overrides, `TokenRefreshView` and `TokenObtainPairView` are imported here to be imported
in the urls.py
"""
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from rest_framework.permissions import IsAuthenticated
from apps.common.views import BaseViewSet
from .models import User
from .serializers import UserSerializer


class ProfileViewSet(BaseViewSet):
    queryset = User.objects.get_queryset()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
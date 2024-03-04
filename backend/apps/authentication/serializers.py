from apps.common.serializers import BaseSerializer
from .models import User

class UserSerializer(BaseSerializer):
    class Meta:
        model = User
        exclude = ('password',)
        
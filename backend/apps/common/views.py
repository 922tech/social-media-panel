import http

from django.conf import settings
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.common.serializers import HealthSerializer

from .utils import archive_database, database, app, redis, memcached


class BaseViewSet(viewsets.GenericViewSet):
    """
    This class provides with an interface to all other view sets in this project.
    If any overrides needed in all the view sets this is where the logic should take place.
    """
    pass


class HealthViewSet(BaseViewSet):
    permission_classes = [AllowAny]
    serializer_class = HealthSerializer

    @action(methods=['GET', 'OPTIONS'], detail=False, url_path='text', url_name='text')
    def text(self, request, *args, **kwargs):
        app_text = f"medrick_app {app()}"
        database_text = f"medrick_db {database()}"
        redis_text = f"medrick_redis {redis()}"
        memcached_text = f"medrick_memcached {memcached()}"
        archive_db = f"medrick_mongo_db {archive_database()}"

        return HttpResponse(f"{app_text}\n{database_text}\n{redis_text}\n{memcached_text}\n{archive_db}",
                            content_type="text/plain", status=http.HTTPStatus.OK)

    @action(methods=['GET'], detail=False, url_path='json', url_name='json')
    def json(self, request, *args, **kwargs):
        return Response(HealthSerializer({
            "project_name": settings.PROJECT_NAME,
            'version': settings.VERSION,
            'app': app(),
            'database': database(),
            'redis': redis(),
            'memcached': memcached(),
            'archive_database': archive_database(),
        }).data)

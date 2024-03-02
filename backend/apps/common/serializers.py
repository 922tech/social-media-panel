from rest_framework import serializers


class BaseSerializer(serializers.Serializer):
    """
    This class provides an interface to all the serializers in this project since
    all other serializers inherit this class.
    """
    pass


class HealthSerializer(BaseSerializer):
    project_name = serializers.CharField(max_length=256)
    version = serializers.CharField(max_length=100)
    app = serializers.BooleanField()
    database = serializers.BooleanField()
    redis = serializers.BooleanField()
    memcached = serializers.BooleanField()
    archive_database = serializers.BooleanField()


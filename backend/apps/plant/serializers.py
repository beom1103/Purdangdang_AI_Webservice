from rest_framework import serializers

from .models import Plant


class PlantSerializer(serializers.ModelSerializer):
    """
    식물 정보 
    """
    class Meta:
        model = Plant
        fields = "__all__"

from rest_framework import serializers
from .models import Calc

class CalcSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calc
        fields = ('title', 'body', 'rate', 'count')
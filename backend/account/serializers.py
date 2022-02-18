from rest_framework import serializers
from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        # fields = '__all__'
        fields = ['name', 'email', 'password']
        examples = {
            "name": "시비",
            "email": "sibisibi@sibi.com",
            "password": "sibisibi"
        }
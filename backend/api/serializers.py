from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Profile

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# 회원가입
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"], None, validated_data["password"]
        )
        return user


# 접속 유지중인지 확인
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


# 로그인
class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")

class ProfileSerializer():
    class Meta:
        model = Profile
        fields = ("id", "username")

# class AccountSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Account
#         # fields = '__all__'
#         fields = ['name', 'email', 'password']
#         examples = {
#             "name": "시비",
#             "email": "sibisibi@sibi.com",
#             "password": "sibisibi"
#         }
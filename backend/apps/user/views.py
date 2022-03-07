from django.shortcuts import redirect, get_object_or_404
from rest_framework import viewsets, permissions, generics, status
from rest_framework.exceptions import ValidationError, ParseError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from knox.auth import TokenAuthentication
from knox.models import AuthToken

from .pagination import LikeListPagination
from .serializers import CreateUserSerializer, UserSerializer, LoginUserSerializer, UserPlantSerializer
from .models import User, UserPlant
from apps.plant.models import Plant, Wishlist
from apps.plant.serializers import PlantDetailSerializer

import re
 
regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

        
# Create your views here.
# class ProfileUpdateAPI(generics.UpdateAPIView):
#     lookup_field = "user_pk"
#     queryset = Profile.objects.all()
#     serializer_class = ProfileSerializer

class RegistrationAPI(generics.GenericAPIView):
    
    serializer_class = CreateUserSerializer

    def check(email):
        if(re.fullmatch(regex, email)):
            return False;
        return True;

    def post(self, request, *args, **kwargs):
        """
        회원가입
        
        회원가입 후 토큰 발급. 
        """
        if not (2 <= len(request.data["username"]) <= 10) or not (6 <= len(request.data["password"]) <= 15) or check(request.data["email"]):
            body = {"message": "wrong field"}
            return Response(body, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )
        
class LoginAPI(generics.GenericAPIView):
    
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        """
        로그인
        
        로그인 후 토큰 발급. 
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )

class UserAPI(generics.RetrieveAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        """
        접속 유지 확인 
        """
        return self.request.user
    
class UserLikeListView(APIView, LikeListPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_user(self):
        return self.request.user
    
    def get(self, request, username: str, format=None):
        """
        찜 목록 조회
        
        마이 페이지에서 찜 목록 조회
        """
        user = User.objects.get(username=self.get_user()).id
        wishlist = Wishlist.objects.filter(user_id=user)
        plants = []
        for w in wishlist.values():
            results = get_object_or_404(Plant, pk=w['plant_id_id'])
            serializer = PlantDetailSerializer(results)
            plants.append(serializer.data)
            
        return Response(self.get_paginated_response(plants), status=status.HTTP_201_CREATED)
    
class UserProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_user(self):
        return self.request.user
    
    def image_exception(self):
        FORMAT = [".jpg"] # 지원하는 포맷확장자 나열
        
        try:
            file = self.request.data['file']
        except KeyError:
            raise ParseError('Request has no resource file attached')
        
        # 파일 확장자 검사 
        if str(file).endswith(tuple(FORMAT)) : return 
        raise ValidationError("Invalid format")

    def get(self, request, username: str, format=None):
        """
        반려 식물 조회
        
        마이 페이지에서 반려 식물 3개를 조회
        """
        user = User.objects.get(username=self.get_user()).id
        wishlist = Wishlist.objects.filter(user_id=user)
        userplant = UserPlant.objects.filter(user_id=user)
        plants = []
        for w in wishlist.values():
            results = get_object_or_404(Plant, pk=w['plant_id_id'])
            serializer = PlantDetailSerializer(results)
            plants.append(serializer.data)
        results = {
            'wishlist' : plants,
            'userplant' : userplant
        }
        return Response(results, status=status.HTTP_201_CREATED)
    
    def post(self, request, username: str, format=None):
        """
        반려 식물 등록 
        
        반려 식물의 이미지와 이름을 생성  
        """
        act = request.GET.get("act", None) # img : 이미지 업로드, name : 이름 수정
        order = request.GET.get("order", None) 
        user = self.get_user()
        if act == 'img':
            self.image_exception()
            UserPlant.objects.update_or_create(image=request.data['file'],order=order,user_id=user)
            return 
        if act == 'name':
            UserPlant.objects.update_or_create(name=request.data['name'],order=order,user_id=user)

        # user = User.objects.get(username=self.get_user()).id
        # serializer = UserPlantSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)

        # validated_data = serializer.validated_data

        # userplant = UserPlant()
        # userplant.user_id = self.get_user()
        # userplant.name = validated_data["name"]
        # userplant.image = validated_data["file"]
        # userplant.order = validated_data["order"]
        # userplant.save()

        return Response("Successfully created.", status=status.HTTP_201_CREATED)
    
    def put(self, request, username: str, format=None):
        """
        반려 식물 수정 
        
        반려 식물의 이미지와 이름을 수정  
        """
        self.image_exception()
        serializer = UserPlantSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

        return Response("Successfully updated.", status=status.HTTP_201_CREATED)


    

    

        

from django.shortcuts import redirect, get_object_or_404
from django.core.files.base import ContentFile
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


class RegistrationAPI(generics.GenericAPIView):
    
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        """
        회원가입
        
        회원가입 후 토큰 발급. 
        """
        print(request.data["email"])
        if not (2 <= len(request.data["username"]) <= 10) or not (6 <= len(request.data["password"]) <= 15) :
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
    
    
class UserProfileView(APIView, LikeListPagination):
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
        
        마이 페이지에서 반려 식물과 찜리스트 조회
        """
        user = User.objects.get(username=self.get_user()).id
        wishlist = Wishlist.objects.filter(user_id=user)
        userplants = UserPlant.objects.filter(user_id=user)
        serializer1 = UserPlantSerializer(userplants, many=True)   
        plants = []
        for w in wishlist.values():
            results = get_object_or_404(Plant, pk=w['plant_id_id'])
            serializer2 = PlantDetailSerializer(results)
            plants.append(serializer2.data)
        results = {
            'wishlist' : plants,
            'userplant' : serializer1.data
        }
        return Response(results, status=status.HTTP_201_CREATED)
    
    def post(self, request, username: str, format=None):
        """
        반려 식물 등록
        
        반려 식물의 이미지와 이름을 생성
        """
        order = request.GET.get("order", None) 
        image = request.data['file']
        name = request.data['name']
        if not len(name) : return Response("Please fill the name", status=status.HTTP_201_CREATED)
        if int(order) not in [1,2,3] : 
            return Response("Invalid order", status=status.HTTP_201_CREATED)
        user = self.get_user()
        if UserPlant.objects.filter(user_id=user, order=order).exists():
            userplant = get_object_or_404(UserPlant, user_id=user, order=order)
            userplant.delete()
        UserPlant.objects.update_or_create(image=image, name=name, order=order, user_id=user)
 
        userplants = UserPlant.objects.filter(order=order, user_id=user)
        serializer = UserPlantSerializer(userplants, many=True)   
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def put(self, request, username: str, format=None):
        """
        반려 식물 수정 
        
        반려 식물의 이미지와 이름을 수정  
        """
        order = request.GET.get("order", None) 
        image = request.data['file']
        name = request.data['name']
        if not len(name) : return Response("Please fill the name", status=status.HTTP_201_CREATED)
        if int(order) not in [1,2,3] : 
            return Response("Invalid order", status=status.HTTP_201_CREATED)
        user = self.get_user()
        if UserPlant.objects.filter(user_id=user, order=order).exists():
            userplant = get_object_or_404(UserPlant, user_id=user, order=order)
            userplant.delete()
        UserPlant.objects.update_or_create(image=image, name=name, order=order, user_id=user)
 
        userplants = UserPlant.objects.filter(order=order, user_id=user)
        serializer = UserPlantSerializer(userplants, many=True)   
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, username: str, format=None):
        """
        반려 식물 삭제 
        
        반려 식물의 이미지와 이름을 삭제  
        """
        order = request.GET.get("order", None) 
        user = self.get_user()
        if UserPlant.objects.filter(user_id=user, order=order).exists():
            userplant = get_object_or_404(UserPlant, user_id=user, order=order)
            userplant.delete()
            return Response("Successfully deleted.", status=status.HTTP_201_CREATED)
        return Response("There is no item", status=status.HTTP_201_CREATED)


    

    

        

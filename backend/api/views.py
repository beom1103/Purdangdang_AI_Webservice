# from django.http import HttpResponse, JsonResponse, Http404
# from django.views.decorators.csrf import csrf_exempt
# from .models import Account
# from .serializers import AccountSerializer
# from rest_framework.parsers import JSONParser
# from rest_framework.views import APIView
# from drf_yasg.utils import swagger_auto_schema
# from drf_yasg import openapi

from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from knox.models import AuthToken
from .serializers import CreateUserSerializer, UserSerializer, LoginUserSerializer, ProfileSerializer
from .models import Profile
# Create your views here.
class ProfileUpdateAPI(generics.UpdateAPIView):
    lookup_field = "user_pk"
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        if len(request.data["username"]) < 6 or len(request.data["password"]) < 4:
            body = {"message": "short field"}
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
        return self.request.user
# class account_list(APIView):
#     def get(self): # 계정 전체 조회 
#         query_set = Account.objects.all()
#         serializer = AccountSerializer(query_set, many=True)
#         return JsonResponse(serializer.data, safe=False)

#     def post(self, request): # 회원가입 
#         data = JSONParser().parse(request)
#         serializer = AccountSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)


# class account(APIView):
#     def get_object(self, pk):
#         try:
#             return Account.objects.get(pk=pk)
#         except Account.DoesNotExist:
#             raise Http404
            
#     def get(self, request, pk, format=None): # pk로 특정 계정 조회 
#         obj = self.get_object(pk)
#         serializer = AccountSerializer(obj)

#         return JsonResponse(serializer.data, safe=False)

#     def put(self, request, pk): # pk로 특정 계정 수정
#         obj = Account.objects.get(pk=pk)
#         data = JSONParser().parse(request)
#         serializer = AccountSerializer(obj, data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)

#     def delete(self, pk): # pk로 특정 계정 삭제
#         obj = Account.objects.get(pk=pk)
#         obj.delete()
#         return HttpResponse(status=204)


# class login(APIView):
#     def post(self, request): # 로그인
#         data = JSONParser().parse(request)
#         search_email = data['email']
#         obj = Account.objects.get(email=search_email)

#         if data['password'] == obj.password:
#             return HttpResponse(status=200)
#         else:
#             return HttpResponse(status=400)
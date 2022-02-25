from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from .models import Account
from .serializers import AccountSerializer
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.shortcuts import render
from rest_framework.response import Response

class account_list(APIView):
    def get(self, request):
        query_set = Account.objects.all()
        serializer = AccountSerializer(query_set, many=True)
        return JsonResponse(serializer.data, safe=False,json_dumps_params={'ensure_ascii': False})

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = AccountSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


class account(APIView):
    def get_object(self, pk):
        try:
            return Account.objects.get(pk=pk)
        except Account.DoesNotExist:
            raise Http404
            
    def get(self, request, pk, format=None):
        obj = self.get_object(pk)
        serializer = AccountSerializer(obj)

        return JsonResponse(serializer.data, safe=False)

    def post(self, request, pk):
        obj = Account.objects.get(pk=pk)
        data = JSONParser().parse(request)
        serializer = AccountSerializer(obj, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def delete(self, pk):
        obj = Account.objects.get(pk=pk)
        obj.delete()
        return HttpResponse(status=204)


class login(APIView):
    def post(self, request):
        data = JSONParser().parse(request)
        search_email = data['email']
        obj = Account.objects.get(email=search_email)

        if data['password'] == obj.password:
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=400)

def logintest(request):
    print('여기는 로그인 테스트입니다.')
    return render(request, 'account/login.html')
    #return JsonResponse('This is login test!', safe=False)

def login_success(request):
    return JsonResponse('google login success!', safe=False)

class login_success(APIView):
    def get(self, request):
        print('소셜 로그인 들어옴!!')
        return JsonResponse('google login success!', safe=False)

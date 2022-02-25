from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Calc, User
from .serializers import CalcSerializer
import random
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import redirect
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google import views as google_view
import requests
from rest_framework import status
from json.decoder import JSONDecodeError
from account.models import Account
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.providers.oauth2.client import OAuth2Client


# Create your views here.
'''@api_view(['GET'])
def helloAPI(request):
    return Response("Hello API!")'''

'''@api_view(['GET'])
def randomAPI(request, id):
    totalCalcs = Calc.objects.all()
    randomCalcs = random.sample(list(totalCalcs), id)
    serializer = CalcSerializer(randomCalcs, many=True)
    return Response(serializer.data)'''

class randomCalc(APIView):
    def get(self,request,id):
        totalCalcs = Calc.objects.all()
        randomCalcs = random.sample(list(totalCalcs), id)
        serializer = CalcSerializer(randomCalcs, many=True)
        
        return JsonResponse(serializer.data, safe=False,json_dumps_params={'ensure_ascii': False})
    
class helloAPI(APIView):
    def get(self, request):
        return JsonResponse('Hello api!!!', safe=False)

class google_callback(APIView):
    def get(self, request):
        print('소셜 로그인 들어옴!!')
        return JsonResponse('google login success!', safe=False)

# code 요청
'''class google_login(APIView):
    def get(self, request):
        print("google login 들어옴!!")
        app_rest_api_key = 808974595631-mka0gfen272dqe388ned3e726jaseenu.apps.googleusercontent.com
        scope = "https://www.googleapis.com/auth/userinfo.email"
        
        redirect_uri = "http://127.0.0.1:8000/google/google/login/callback/"

        return redirect(
            f"https://kauth.kakao.com/oauth/authorize?client_id={app_rest_api_key}&redirect_uri={redirect_uri}&response_type=code&scope={scope}"
        )'''


BASE_URL = 'http://127.0.0.1:8000/'
GOOGLE_CALLBACK_URI = BASE_URL + 'google/google/callback/'




def google_login(request):
    """
    Code Request
    """

    print('google_login 들어옴')
    scope = "https://www.googleapis.com/auth/userinfo.email"
    client_id = "808974595631-mka0gfen272dqe388ned3e726jaseenu.apps.googleusercontent.com"
    return redirect(f"https://accounts.google.com/o/oauth2/v2/auth?client_id={client_id}&response_type=code&redirect_uri={GOOGLE_CALLBACK_URI}&scope={scope}")


def google_callback(request):
    print('call_back입니다!!')
    print('call_back입니다!!')
    print('call_back입니다!!')
    client_id = "808974595631-mka0gfen272dqe388ned3e726jaseenu.apps.googleusercontent.com"
    client_secret = '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'
    code = request.GET.get('code')
    """
    Access Token Request
    """
    print('@@@!!')
    token_req = requests.post(
        f"https://oauth2.googleapis.com/token?client_id={client_id}&client_secret={client_secret}&code={code}&grant_type=authorization_code&redirect_uri={GOOGLE_CALLBACK_URI}")
    print('rrr!!')
    token_req_json = token_req.json()
    error = token_req_json.get("error")
    print('token_req_json는 ',token_req_json)
    print('error는 ', error)
    if error is not None:
        print('eee!!')
        raise JSONDecodeError(error)
    access_token = token_req_json.get('access_token')
    print('$$$!!')
    """
    Email Request
    """
    print('000!!')
    email_req = requests.get(
        f"https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={access_token}")
    email_req_status = email_req.status_code
    if email_req_status != 200:
        return JsonResponse({'err_msg': 'failed to get email'}, status=status.HTTP_400_BAD_REQUEST)
    email_req_json = email_req.json()
    email = email_req_json.get('email')
    """
    Signup or Signin Request
    """
    print('111!!')
    try:
        user = User.objects.get(email=email)
        print('가!!')
        # 기존에 가입된 유저의 Provider가 google이 아니면 에러 발생, 맞으면 로그인
        # 다른 SNS로 가입된 유저
        social_user = SocialAccount.objects.get(user=user)
        print('나!!')
        if social_user is None:
            print('다!!')
            return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)
        if social_user.provider != 'google':
            print('라!!')
            return JsonResponse({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)
        print('222!!')
        # 기존에 Google로 가입된 유저
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(
            f"{BASE_URL}accounts/google/login/finish/", data=data)
        accept_status = accept.status_code
        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signin'}, status=accept_status)
        accept_json = accept.json()
        accept_json.pop('user', None)
        return JsonResponse(accept_json)
        print('333!!')
    except User.DoesNotExist:
        print('444!!')
        # 기존에 가입된 유저가 없으면 새로 가입
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(
            f"{BASE_URL}accounts/google/login/finish/", data=data)
        accept_status = accept.status_code
        print('555!!')
        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signup'}, status=accept_status)
        accept_json = accept.json()
        accept_json.pop('user', None)
        return JsonResponse(accept_json)


class GoogleLogin(SocialLoginView):
    adapter_class = google_view.GoogleOAuth2Adapter
    callback_url = GOOGLE_CALLBACK_URI
    client_class = OAuth2Client

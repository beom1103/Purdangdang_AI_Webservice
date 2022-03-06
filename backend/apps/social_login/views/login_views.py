# from django.shortcuts import render
# from rest_framework.response import Response
# from rest_framework.decorators import api_view
# from ..models import  User
# from rest_framework.views import APIView
# from django.http import JsonResponse, HttpResponse
# from django.shortcuts import redirect
# from dj_rest_auth.registration.views import SocialLoginView
# from allauth.socialaccount.providers.google import views as google_view
# import requests
# from rest_framework import status
# from json.decoder import JSONDecodeError
# from allauth.socialaccount.models import SocialAccount
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# import datetime
# from config.settings import SIMPLE_JWT
# from rest_framework.permissions import IsAuthenticated
# from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework import serializers
# from django.conf import settings





# BASE_URL = 'http://127.0.0.1:8000/api/'
# GOOGLE_CALLBACK_URI = BASE_URL + 'google/google/callback/'


# class google_login(APIView):
#     """
#     Code Request
#     """
    
#     def get(self, request):
#         scope = "https://www.googleapis.com/auth/userinfo.email"
#         client_id = getattr(settings, "SOCIAL_AUTH_GOOGLE_CLIENT_ID")
#         return redirect(f"https://accounts.google.com/o/oauth2/v2/auth?client_id={client_id}&response_type=code&redirect_uri={GOOGLE_CALLBACK_URI}&scope={scope}")


# class google_callback(APIView):
#     def get(self, request):
#         client_id = getattr(settings, "SOCIAL_AUTH_GOOGLE_CLIENT_ID")
#         client_secret = getattr(settings, "SOCIAL_AUTH_GOOGLE_SECRET")
#         code = request.GET.get('code')
#         """
#         Access Token Request
#         """

#         token_req = requests.post(
#             f"https://oauth2.googleapis.com/token?client_id={client_id}&client_secret={client_secret}&code={code}&grant_type=authorization_code&redirect_uri={GOOGLE_CALLBACK_URI}")

#         token_req_json = token_req.json()
#         error = token_req_json.get("error")

#         if error is not None:
#             raise JSONDecodeError(error)
#         access_token = token_req_json.get('access_token')

#         """
#         Email Request
#         """
#         email_req = requests.get(
#             f"https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={access_token}")
#         email_req_status = email_req.status_code
#         if email_req_status != 200:
#             return JsonResponse({'err_msg': 'failed to get email'}, status=status.HTTP_400_BAD_REQUEST)
#         email_req_json = email_req.json()
#         email = email_req_json.get('email')

#         now = datetime.datetime.now()
#         expiration_time = now + SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']
#         expiration_time = expiration_time.strftime('%Y-%m-%d %H:%M:%S')
        
#         """
#         Signup or Signin Request
#         """
#         try:
#             user = User.objects.get(email=email)
#             # 기존에 가입된 유저의 Provider가 google이 아니면 에러 발생, 맞으면 로그인
#             # 다른 SNS로 가입된 유저
#             social_user = SocialAccount.objects.get(user=user)
#             if social_user is None:
#                 return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)
#             if social_user.provider != 'google':
#                 return JsonResponse({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)
#             # 기존에 Google로 가입된 유저
#             data = {'access_token': access_token, 'code': code}
#             accept = requests.post(
#                 f"{BASE_URL}google/google/login/finish/", data=data)
#             accept_status = accept.status_code
#             if accept_status != 200:
#                 return JsonResponse({'err_msg': 'failed to signin'}, status=accept_status)
#             accept_json = accept.json()
#             accept_json.pop('user', None)
#             accept_json['expiration_time']  = expiration_time
#             accept_json['email'] = email
            
#             return JsonResponse(accept_json)
#         except User.DoesNotExist:
#             # 기존에 가입된 유저가 없으면 새로 가입
#             data = {'access_token': access_token, 'code': code}
#             accept = requests.post(
#                 f"{BASE_URL}google/google/login/finish/", data=data)
#             accept_status = accept.status_code
            
#             if accept_status != 200:
#                 return JsonResponse({'err_msg': 'failed to signup'}, status=accept_status)
#             accept_json = accept.json()
#             accept_json.pop('user', None)
#             accept_json['expiration_time']  = expiration_time
#             accept_json['email'] = email
#             return JsonResponse(accept_json)


# class GoogleLogin(SocialLoginView):
#     #구글 로그인 화면 보여줌.
#     adapter_class = google_view.GoogleOAuth2Adapter
#     callback_url = GOOGLE_CALLBACK_URI
#     client_class = OAuth2Client
#     #완료 후 access token, refresh token 전달?



# class google_logout(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request, *args, **kwargs):
#         if self.request.data.get('all'):
#             token: OutstandingToken
#             for token in OutstandingToken.objects.filter(user=request.user):
#                 _, _ = BlacklistedToken.objects.get_or_create(token=token)
#             return Response({"status": "OK, goodbye, all refresh tokens blacklisted"})
#         refresh_token = self.request.data.get('refresh_token')
#         token = RefreshToken(token=refresh_token)
#         token.blacklist()
#         return Response({"status": "success!"}, status=status.HTTP_204_NO_CONTENT)

from django.urls import path
# from account import views
from .views import RegistrationAPI, LoginAPI, UserAPI, ProfileUpdateAPI

urlpatterns = [
    path("auth/register/", RegistrationAPI.as_view()),
    path("auth/login/", LoginAPI.as_view()),
    path("auth/user/", UserAPI.as_view()),
    path("auth/profile/<int:user_pk>/update/", ProfileUpdateAPI.as_view()),
]
# urlpatterns = [
#     path('accounts', views.account_list.as_view()),
#     path('accounts/<int:pk>', views.account.as_view()),
#     path('login', views.login.as_view()),
#     path('auth', include('rest_framework.urls', namespace='rest_framework'))
# ]
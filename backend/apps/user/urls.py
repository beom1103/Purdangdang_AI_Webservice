from django.urls import path
# from account import views
from .views import RegistrationAPI, LoginAPI, UserAPI, ProfileUpdateAPI
from knox import views as knox_views


# EndPoints
"""
    POST /api/common/auth/register
    POST /api/common/auth/login
    POST /api/common/auth/logout
    GET /api/common/auth/user
"""

urlpatterns = [
    path("auth/register/", RegistrationAPI.as_view()),
    path("auth/login/", LoginAPI.as_view()),
    path('auth/logout',knox_views.LogoutView.as_view(), name="knox-logout"),
    path("auth/user/", UserAPI.as_view()),
    path("auth/profile/<int:user_pk>/update/", ProfileUpdateAPI.as_view()),
]

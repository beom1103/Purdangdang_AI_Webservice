from django.urls import path
# from account import views
from .views import RegistrationAPI, LoginAPI, UserAPI
from knox import views as knox_views


# EndPoints
"""
    POST /api/auth/register
    POST /api/auth/login
    POST /api/auth/logout
    GET /api/auth/user
"""

urlpatterns = [
    path("auth/register", name="register", view = RegistrationAPI.as_view()),
    path("auth/login", name="login", view = LoginAPI.as_view()),
    path('auth/logout', name="knox-logout", view = knox_views.LogoutView.as_view(), ),
    path("auth/user", name="user", view = UserAPI.as_view()),   
    # path("<str: username>", name="userinfo", view = UserInfoView.as_view),
    # path("auth/profile/<int:user_pk>/update", view = ProfileUpdateAPI.as_view()),
]

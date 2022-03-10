from django.urls import path
from .views import RegistrationAPI, LoginAPI, UserAPI, UserProfileView
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
    path('auth/logout', name="knox-logout", view = knox_views.LogoutView.as_view()),
    path("auth/user", name="user", view = UserAPI.as_view()),   
    path("user/<str:username>", name="user-profile", view = UserProfileView.as_view()),
]

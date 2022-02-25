from django.urls import path, include
from api import views


urlpatterns = [
    path("hello/", views.helloAPI.as_view()),
    path("random/<int:id>/", views.randomCalc.as_view()),
   #path('google/login/callback/', views.google_callback.as_view()),
    #path('google/login/', views.google_login.as_view())
    #path('google/login/', views.google_login, name='google_login'),
    path('test/', views.google_login, name='google_login'),
    path('google/callback/', views.google_callback, name='google_callback'),
    #path('google/login/finish/', views.GoogleLogin.as_view(),
    #     name='google_login_todjango'),
]
from django.urls import path, include
from .views import login_views, token_views,test_views


urlpatterns = [
    path('google/social_login/', login_views.google_login.as_view(), name='google_login'),
    path('google/callback/', login_views.google_callback.as_view(), name='google_callback'),
    path('google/login/finish/', login_views.GoogleLogin.as_view(),
         name='google_login_todjango'),
    path('google/social_logout/', login_views.google_logout.as_view()),
    path('google/token/refresh/', token_views.MyTokenRefreshView.as_view()),
    path('google/test/', test_views.test.as_view()),

]
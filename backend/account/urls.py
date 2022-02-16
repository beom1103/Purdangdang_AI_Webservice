from django.urls import path
from account import views
from django.conf.urls import include

urlpatterns = [
    path('accounts', views.account_list),
    path('accounts/<int:pk>', views.account),
    path('login', views.login),
    path('auth', include('rest_framework.urls', namespace='rest_framework'))
]
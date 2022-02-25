from django.urls import path
from account import views
from django.conf.urls import include

app_name = 'account'

urlpatterns = [
    path('accounts/', views.account_list.as_view()),
    path('accounts/<int:pk>', views.account.as_view()),
    path('login/', views.login.as_view()),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('logintest/', views.logintest),
    path('success/', views.login_success.as_view()),
    
]

"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:

    https://docs.djangoproject.com/en/4.0/topics/http/urls/


Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include, re_path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.contrib import admin
from django.conf import settings
from rest_framework.permissions import AllowAny
from rest_framework import routers, permissions


schema_view = get_schema_view(
    openapi.Info(
        title="Backend API", # 타이틀
        default_version='v1', # 버전
        description="프로젝트 API 문서", # 설명
        terms_of_service="https://www.google.com/policies/terms/",
        # contact=openapi.Contact(email="이메일"),
        # license=openapi.License(name=""),
    ),
    validators=['flex'],
    public=True,
    permission_classes=(AllowAny,)
)

app_urls = [
    #path('admin/', admin.site.urls),
    path("", include("apps.user.urls")),
    path("plant/",include("apps.plant.urls")),
    path("auth/", include("knox.urls")),
    path('accounts/', include('dj_rest_auth.urls')),
    path('accounts/', include('dj_rest_auth.registration.urls')),
    path('google/', include('allauth.urls')),
    path('google/', include('apps.social_login.urls')),
    path("survey/", include("apps.plant_survey.urls")),

    
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(app_urls)),
    path('accounts/', include('allauth.urls')),
]

if settings.DEBUG:
    urlpatterns += [
        re_path(r"^swagger(?P<format>\.json|\.yaml)$",schema_view.without_ui(cache_timeout=0), name="schema-json"),
        re_path(r"^swagger/$", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
        re_path(r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]
    



from django.urls import path
from .views import SurveyResultView


urlpatterns = [
    path("<data>/", view=SurveyResultView.as_view()),
    path("", view=SurveyResultView.as_view()),
]

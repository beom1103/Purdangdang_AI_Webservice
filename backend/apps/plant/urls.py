from django.urls import path
# from account import views
from .views import PlantListView

# EndPoints
"""
    GET /api/plant/search
"""

urlpatterns = [
    path("search", view=PlantListView.as_view()),
]

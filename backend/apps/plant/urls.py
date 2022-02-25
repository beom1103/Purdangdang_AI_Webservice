from django.urls import path
from .views import PlantListView, PlantDetailView, PlantReviewListView

# EndPoints
"""
    GET /api/plant/search
"""

urlpatterns = [
    path("search", view=PlantListView.as_view()),
    path("<int:plant_id>/info", name="info", view=PlantDetailView.as_view()),
    path("<int:plant_id>/reviews",name="reviews",view=PlantReviewListView.as_view(),),
]

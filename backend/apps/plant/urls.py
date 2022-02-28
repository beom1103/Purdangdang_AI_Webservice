from django.urls import path
from .views import PlantListView, PlantDetailView, PlantReviewListView

# EndPoints
"""
    GET /api/plant/search
    GET /api/plant/<int:plant_id>/info
    GET /api/plant/<int:plant_id>/reviews
    POST /api/plant/<int:plant_id>/reviews
    PUT /api/plant/<int:plant_id>/reviews
    DELETE /api/plant/<int:plant_id>/reviews
"""

urlpatterns = [
    path("search", view=PlantListView.as_view()),
    path("<int:plant_id>/info", name="info", view=PlantDetailView.as_view()),
    path("<int:plant_id>/reviews",name="reviews",view=PlantReviewListView.as_view(),),
]

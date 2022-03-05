from django.urls import path, re_path
from .views import PlantListView, PlantDetailView, PlantReviewListView, PlantUploadView, PlantLikeView

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
    path("search", name="search", view=PlantListView.as_view()),
    path("upload", name="upload", view=PlantUploadView.as_view()),
    path("<int:plant_id>/info", name="info", view=PlantDetailView.as_view()),
    path("<int:plant_id>/reviews", name="reviews", view=PlantReviewListView.as_view()),
    path("<int:plant_id>/like", name="like", view=PlantLikeView.as_view()),
]

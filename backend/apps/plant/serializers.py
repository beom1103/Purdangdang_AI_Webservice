from rest_framework import serializers

from .models import Plant, Review, UploadImage, Wishlist, Disease

class PlantSerializer(serializers.ModelSerializer):
    """
    식물 정보 
    """
    class Meta:
        model = Plant
        fields = [
            "id",
            "kor",
            "name",
            "rank",
            "image_url"
        ]
        
class PlantDetailSerializer(serializers.ModelSerializer):
    """
    식물 상세 정보 
    """
    class Meta:
        model = Plant
        fields = "__all__"
        
class PlantReviewSerializer(serializers.ModelSerializer):
    
    """
    식물 리뷰 조회, 생성, 수정, 삭제 
    """

    username = serializers.CharField(source="user_id.username", read_only=True)
    plantname = serializers.CharField(source="plant_id.kor", read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "username",
            "plant_id",
            "plantname",
            "score",
            "content",
            "created_at",
            "updated_at"
        ]
        read_only_fields = ("id",)

class UploadSerializer(serializers.ModelSerializer):
    """
    식물 이미지 업로드
    """
    class Meta:
        model = UploadImage
        fields = "__all__"

class WishlistSerializer(serializers.ModelSerializer):
    """
    찜 리스트 
    """
    class Meta:
        model = Wishlist
        fields = "__all__"

class DiseaseSerializer(serializers.ModelSerializer):
    """
    질병 정보 
    """
    class Meta:
        model = Disease
        fields = "__all__"
from django.shortcuts import redirect, get_object_or_404
from django.db.models import Q
from rest_framework import filters, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.auth import TokenAuthentication

from .pagination import PlantListPagination
from .models import Plant, Review, Category
from .serializers import PlantSerializer, PlantDetailSerializer, PlantReviewSerializer

class PlantListView(APIView, PlantListPagination):
    """
    식물 검색

    조건에 따른 식물 목록 검색 결과를 반환
    """
    def get(self, request, format=None):
        keyword = request.GET.get("keyword", None) # 검색어 
        f = request.GET.get("f",None) # 필터 

        def search():
            plants = Plant.objects.filter(
                Q(kor__icontains=keyword) | Q(name__icontains=keyword)
            )
            return plants
        
        category = Category.objects.get(name=f).plant_set.all()
    
        if keyword: queryset = search()
        else: queryset = Plant.objects.all()

        results = self.paginate_queryset(queryset.intersection(category), request, view=self)
        serializer_class = PlantSerializer(results, many=True)
        
        return self.get_paginated_response(serializer_class.data)

class PlantDetailView(APIView):
    """
    식물 상세 정보 

    요청한 식물의 상세 정보를 반환
    """
    def get(self, request, plant_id, format=None):
        results = get_object_or_404(Plant, pk=plant_id)
        serializer = PlantDetailSerializer(results)
        return Response(serializer.data)
    
class PlantReviewListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_user(self):
        return self.request.user

    def get(self, request, plant_id: int, format=None):
        """
        식물별 리뷰 요청

        식물(id)에 대한 리뷰 요청 - 삭제된 리뷰 제외
        """
        review = Review.objects.filter(plant_id=plant_id).order_by("-updated_at")[:3]
        serializer = PlantReviewSerializer(review, many=True)
        return Response(serializer.data)

    def post(self, request, plant_id: int, format=None):
        """
        식물 리뷰 등록

        식물(id) 리뷰 등록
        """
        user = self.get_user()
        plant = get_object_or_404(Plant, pk=plant_id)

        serializer = PlantReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        validated_data = serializer.validated_data
        

        review = Review()
        review.user_id = user
        review.plant_id = plant
        review.content = validated_data["content"]
        review.score = validated_data["score"]

        review.save()

        return redirect(f'/api/plant/{plant_id}/reviews') 

    def put(self, request, plant_id: int, format=None):
        """
        식물 리뷰 수정

        식물(id) 리뷰 수정
        """
        user = self.get_user()
        review = get_object_or_404(Review, user_id=user, plant_id=plant_id)
        
        serializer = PlantReviewSerializer(data=request.data, instance=review)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return redirect(f'/api/plant/{plant_id}/reviews') 
        
    def delete(self, request, plant_id: int, format=None):
        """
        식물 리뷰 삭제

        식물(id) 리뷰 삭제
        """
        user = self.get_user()
        # TODO: 특정 식물에 대한 특정 유저의 모든 댓글이 사라지는 문제 
        review = get_object_or_404(Review, user_id=user, plant_id=plant_id)
        review.delete()
        
        # TODO: redirect가 delete안에서만 도는 문제 
        # 일단 get method code 가져와서 임시 해결 
        review = Review.objects.filter(plant_id=plant_id).order_by("-updated_at")[:3]
        serializer = PlantReviewSerializer(review, many=True)
        return Response(serializer.data)

        # return redirect(f'/api/plant/{plant_id}/reviews') 



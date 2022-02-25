from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework import filters, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.auth import TokenAuthentication
from .pagination import PlantListPagination
from .models import Plant, Review
from .serializers import PlantSerializer, PlantDetailSerializer, PlantReviewSerializer

# Create your views here.
class PlantListView(APIView, PlantListPagination):
    """
    식물 검색

    조건에 따른 식물 목록 검색 결과를 반환
    """
    def get(self, request, format=None):
        keyword = request.GET.get("keyword", None)
        # # todo) 공기정화 반려동물 꽃이피는 
        def key_filter():
            plants = Plant.objects.filter(
                Q(kor__icontains=keyword) | Q(name__icontains=keyword)
            )
            return plants

        if keyword: queryset = key_filter()
        else: queryset = Plant.objects.all()

        # plants = self.paginate_queryset(plant, request, view=self)
        results = self.paginate_queryset(queryset, request, view=self)
        serializer_class = PlantSerializer(results, many=True)
        # filter_backends = (filters.SearchFilter,)
        # search_fields = ['kor', 'name']
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
        # review = Review.objects.filter(Q(plant_id=plant_id) &
        # Q(is_deleted=False)).order_by('-created_at')
        # deletedmanager 가 filter 해준결과를 보여줌
        review = Review.objects.filter(plant_id=plant_id).order_by("-created_at")
        serializer = PlantReviewSerializer(review, many=True)
        return Response(serializer.data)

    def post(self, request, plant_id, format=None):
        """
        공원 리뷰 등록

        공원(id) 리뷰 등록
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

        return Response({"detail": "리뷰가 생성되었습니다."}, status=status.HTTP_201_CREATED)




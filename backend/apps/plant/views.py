from django.db.models import Q
from rest_framework.views import APIView
from rest_framework import filters
from .pagination import PlantListPagination
from .models import Plant 
from .serializers import PlantSerializer

# Create your views here.
class PlantListView(APIView, PlantListPagination):
    """
    식물 검색

    조건에 따른 식물 목록 검색 결과를 반환합니다.
    """
    def get(self, request, format=None):
        # sort = request.GET.get("sort", None)
        # # todo) 공기정화 반려동물 꽃이피는 
        # def key_filter():
        #     plants = Plant.objects.filter(
        #         Q(kor__icontains=keyword) | Q(name__icontains=keyword)
        #     )
        #     return plants

        # # todo) 인기순, 최근순 
        # def sort_type(sort, plant):
        #     return plant

        # if sort is not None:
        #     plant = sort_type(sort, plant)

        # plants = self.paginate_queryset(plant, request, view=self)
        queryset = Plant.objects.all()
        results = self.paginate_queryset(queryset, request, view=self)
        serializer_class = PlantSerializer(results, many=True)
        filter_backends = (filters.SearchFilter,)
        search_fields = ['kor', 'name']
        return self.get_paginated_response(serializer_class.data)


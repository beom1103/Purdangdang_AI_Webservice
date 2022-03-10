from django.shortcuts import redirect, get_object_or_404
from django.db.models import Q
from rest_framework import filters, permissions, status
from rest_framework.exceptions import ValidationError, ParseError
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView
from knox.auth import TokenAuthentication

from pathlib import Path
import os 

from .serializers import PlantSerializer, PlantDetailSerializer, PlantReviewSerializer, DiseaseSerializer
from .pagination import PlantListPagination, ReviewListPagination
from .models import Plant, Review, Category, UploadImage, Wishlist, Disease
from apps.user.models import User
from apps.ai import plant_analysis

BASE_DIR = Path(__file__).resolve().parent.parent
class PlantListView(APIView, PlantListPagination):
    """
    식물 검색

    조건에 따른 식물 목록 검색 결과를 반환
    """
    def get(self, request, format=None):
        kw = request.GET.get("kw", None) # 검색어 
        f = request.GET.get("f",None) # 필터 

        def search():
            plants = Plant.objects.filter(
                Q(kor__icontains=kw) | Q(name__icontains=kw)
            )
            return plants
        
        if f: category = Category.objects.get(name=f).plant_set.all()
    
        if kw: queryset = search()
        else : queryset = Plant.objects.all()

        if f: results = self.paginate_queryset(queryset.intersection(category), request, view=self)
        else : results = self.paginate_queryset(queryset, request, view=self)

        serializer = PlantSerializer(results, many=True)
        
        return self.get_paginated_response(serializer.data)

class PlantDetailView(APIView):
    
    def get(self, request, plant_id, format=None):
        """
        식물 상세 정보 

        요청한 식물의 상세 정보를 반환
        """
        results = get_object_or_404(Plant, pk=plant_id)
        serializer = PlantDetailSerializer(results)
        return Response(serializer.data)
    
class PlantReviewListView(APIView, ReviewListPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_user(self):
        return self.request.user

    def get(self, request, plant_id: int, format=None):
        """
        식물 리뷰 조회

        식물(id) 리뷰 조회 (최근순)
        """
        review = Review.objects.filter(plant_id=plant_id).order_by("-updated_at")
        results = self.paginate_queryset(review, request, view=self)
        serializer = PlantReviewSerializer(results, many=True)
        
        return self.get_paginated_response(serializer.data)


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
        
        # 내용이 공백일 때 
        if not len(validated_data["content"]) : 
            raise ValidationError("Please enter the comments!")

        # 한 유저가 두 건 이상 리뷰를 작성하지 못하게 조건 
        review_queryset = Review.objects.filter(plant_id=plant_id, user_id=user)
        if review_queryset.exists():
            raise ValidationError("You've already reviewed this plant!")
        
        review = Review()
        review.user_id = user
        review.plant_id = plant
        review.content = validated_data["content"]
        review.score = validated_data["score"]

        review.save()

        return Response("Successfully created.", status=status.HTTP_201_CREATED)

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
            return Response("Successfully updated.", status=status.HTTP_201_CREATED) 
        
    def delete(self, request, plant_id: int, format=None):
        """
        식물 리뷰 삭제

        식물(id) 리뷰 삭제
        """
        user = self.get_user()
        review = get_object_or_404(Review, user_id=user, plant_id=plant_id)
        review.delete()
        
        return Response("Successfully deleted.", status=status.HTTP_201_CREATED) 

       
THIS_FOLDER = os.path.dirname(Path(__file__).resolve().parent.parent)
FORMAT = [".jpg"] # 지원하는 포맷확장자 나열
class PlantUploadView(APIView):

    def post(self, request, format=None):
        """
        식물 이미지 업로드 
        
        식물 사진을 올리면 예측한 식물의 상세 정보값을 가져옵니다.
               
        """
        act = request.GET.get("act", None) # 식물 종 / 질병
        
        try:
            file = request.data['file']
        except KeyError:
            raise ParseError('Request has no resource file attached')
            
        # 파일 확장자 검사 
        if not str(file).endswith(tuple(FORMAT)) : 
            raise ValidationError("Invalid format")

        uploadFile = UploadImage.objects.create(image=file)
        uploadFile.save()
        my_file = os.path.join(THIS_FOLDER + "/media/", str(uploadFile.image))

        if act == "species":
            model = plant_analysis.Species(THIS_FOLDER + "/apps/ai/48_class_model_3.h5")
            pred = model.predict(my_file)
            result = {'top1':{}, 'top2':{}, 'top3':{}}
            
            for i in range(3):
                top = f'top{i+1}'
                result[top]['detail'] = PlantDetailSerializer(get_object_or_404(Plant, kor=pred[top]['name'])).data
                result[top]['percent'] = str(pred[top]['percent']) + '%'
            
            return Response(result, status=status.HTTP_201_CREATED)
        
        if act == "disease":
            model = plant_analysis.Disease(THIS_FOLDER + "/apps/ai/kaggle.h5")
            pred = model.predict(my_file)
            serializer = DiseaseSerializer(get_object_or_404(Disease, name=pred))
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response("Please choose your action.", status=status.HTTP_201_CREATED)



class PlantLikeView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_user(self):
        return self.request.user
    
    def get(self, request, plant_id: int, format=None):
        """
        찜 유무 조회 
        
        user의 찜 리스트에 해당 식물이 있는지 조회합니다.    
        """
        plant = get_object_or_404(Plant, pk=plant_id)
        wishlist = Wishlist.objects.filter(user_id=self.get_user(), plant_id=plant)
 
        return Response(wishlist.exists(), status=status.HTTP_201_CREATED)

    def post(self, request, plant_id: int, format=None):
        """
        찜 리스트에 추가
        
        user의 찜 리스트에 해당 식물이 추가됩니다.      
        """
        plant = get_object_or_404(Plant, pk=plant_id)

        if Wishlist.objects.get_or_create(user_id=self.get_user(), plant_id=plant)[1]: 
            content = "Successfully created."
        else:
            content = "Already existed"
            
        return Response(content, status=status.HTTP_201_CREATED)
    
    def delete(self, request, plant_id: int, format=None):
        """
        찜 리스트에서 삭제
        
        user의 찜 리스트에 해당 식물이 삭제됩니다.        
        """
        plant = get_object_or_404(Plant, pk=plant_id)
        wishlist = Wishlist.objects.filter(user_id=self.get_user(), plant_id=plant)
        
        if wishlist.exists():
            wishlist.delete()
            content = "Successfully deleteed." 
        else: 
            content = "There is no item"

        return Response(content, status=status.HTTP_201_CREATED)



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

# Build paths inside the project like this: BASE_DIR / 'subdir'.
from .pagination import PlantListPagination, ReviewListPagination
from .models import Plant, Review, Category, UploadImage, Wishlist
from apps.user.models import User
from .serializers import PlantSerializer, PlantDetailSerializer, PlantReviewSerializer, UploadSerializer, WishlistSerializer
from apps.ai import resnet_model

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
        식물별 리뷰 요청

        식물(id)에 대한 리뷰 요청 - 삭제된 리뷰 제외
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
# THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
# my_file = os.path.join(THIS_FOLDER, '48_class_model_3.h5')
       
THIS_FOLDER = os.path.dirname(Path(__file__).resolve().parent.parent)
FORMAT = [".jpg"] # 지원하는 포맷확장자 나열
class PlantUploadView(APIView):
    # parser_classes = (FileUploadParser,)
    
    # def get(self, request, format=None):
    #     """해당 식물 분석 결과의 고유한 DB id값의 상세 정보를 가져옵니다."""

    def post(self, request, format=None):
        """
        식물 이미지 업로드 
        
        식물 사진을 올리면 예측한 식물의 상세 정보값을 가져옵니다.       
        """
        try:
            file = request.data['file']
        except KeyError:
            raise ParseError('Request has no resource file attached')
        
        # 파일 확장자 검사 
        if str(file).endswith(tuple(FORMAT)) : pass 
        else : raise ValidationError("Invalid format")
        
        uploadFile = UploadImage.objects.create(image=file)
        uploadFile.save()
        
        model = resnet_model.Resnet(THIS_FOLDER + "/apps/ai/48_class_model_3.h5")
        my_file = os.path.join(THIS_FOLDER + "/media/", str(uploadFile.image))
        
        pred = model.predict(my_file)
        
        top1 = get_object_or_404(Plant, kor=pred['top1']['name'])
        top2 = get_object_or_404(Plant, kor=pred['top2']['name'])
        top3 = get_object_or_404(Plant, kor=pred['top3']['name'])

        serializer1 = PlantDetailSerializer(top1)
        serializer2 = PlantDetailSerializer(top2)
        serializer3 = PlantDetailSerializer(top3)
        
        result = {
            'top1' : {
                'detail' : serializer1.data,
                'percent' : str(pred['top1']['percent']) + '%'
            },
            'top2' : {
                'detail' : serializer2.data,
                'percent' : str(pred['top2']['percent']) + '%'
            },
            'top3' : {
                'detail' : serializer3.data,
                'percent' : str(pred['top3']['percent']) + '%'
            },
        }
        
        return Response(result, status=status.HTTP_201_CREATED)


class PlantLikeView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_user(self):
        return self.request.user
    
    def get(self, request, plant_id: int, format=None):
        """
        찜 되어있는지 확인
        
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
        user = User.objects.get(username=self.get_user()).id
        plant = get_object_or_404(Plant, pk=plant_id)

        wishlist = Wishlist.objects.get_or_create(user_id=self.get_user(), plant_id=plant)
        
        print(plant)
        print(wishlist)
        
        return Response("Successfully created.", status=status.HTTP_201_CREATED)
    
    def delete(self, request, plant_id: int, format=None):
        """
        찜 리스트에서 삭제
        
        user의 찜 리스트에 해당 식물이 삭제됩니다.        
        """
        user = User.objects.get(username=self.get_user()).id
        plant = get_object_or_404(Plant, pk=plant_id)
        
        wishlist = get_object_or_404(Wishlist, user_id=user, plant_id=plant_id)
        wishlist.delete()
        
        print(plant)
        
        return Response("Successfully deleted.", status=status.HTTP_201_CREATED)



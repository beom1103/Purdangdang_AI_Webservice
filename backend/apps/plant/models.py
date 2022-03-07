from apps.user.models import User
from django.db import models
from django.db.models.deletion import CASCADE, DO_NOTHING
from django.db.models.fields.related import ForeignKey

class Category(models.Model):
    """
        식물 특성 분류  
    """  
    name = models.CharField(max_length=200, verbose_name = '분류 항목') 

class Plant(models.Model):
    """
        식물 정보 
    """    
    kor = models.CharField(max_length=200, verbose_name = '한글 이름')
    name = models.CharField(max_length=200, verbose_name = '영어 이름')
    rank = models.IntegerField(verbose_name = '인기 순위')
    image_url = models.URLField(blank=True, verbose_name = '이미지 링크')
    
    description = models.TextField(verbose_name = '설명', blank=True, null=True)
    water_cycle = models.CharField(max_length=200, verbose_name = '물 주기', blank=True, null=True)
    sunlight = models.CharField(max_length=200, verbose_name = '햇볕', blank=True, null=True)
    temperature = models.CharField(max_length=200, verbose_name = '온도', blank=True, null=True)
    category = models.ManyToManyField(Category)
    
    def __str__(self):
        return str(self.id)


class Review(models.Model):
    """
        식물에 대한 리뷰  
    """ 
    user_id = ForeignKey(
        User,
        on_delete=CASCADE,
        related_name="review_user",
        db_column="user_id",
        verbose_name="유저 ID",
    )
    plant_id = ForeignKey(
        Plant,
        on_delete=CASCADE,
        related_name="review_plant",
        db_column="plant_id",
        verbose_name="식물 ID",
    )
    content = models.CharField(max_length=255, verbose_name="내용")
    score = models.IntegerField(verbose_name="평점")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="댓글 작성일시")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="댓글 수정일시")

    def __str__(self):
        return str(self.id)


class UploadImage(models.Model):
    """
        식물 이미지 업로드 
    """ 
    image = models.ImageField(upload_to="images", verbose_name="식물 이미지", null=True)
    upload_at = models.DateTimeField(auto_now=True, verbose_name="파일 작성일시")

    def __str__(self):
        return str(self.image)


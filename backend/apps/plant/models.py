from apps.user.models import User
from django.db import models
from django.db.models.deletion import CASCADE, DO_NOTHING
from django.db.models.fields.related import ForeignKey

# Create your models here.
class Plant(models.Model):    
    kor = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    rank = models.IntegerField()
    image_url = models.URLField(blank=True)
    
    description = models.TextField(max_length=1000, blank=True, null=True)
    water_cycle = models.CharField(max_length=200, blank=True, null=True)
    sunlight = models.CharField(max_length=200, blank=True, null=True)
    temperature = models.CharField(max_length=200, blank=True, null=True)
    shopping_url = models.URLField(blank=True)
    
    def __str__(self):
        # 객체를 출력 할 때 나타나는 값 
        return str(self.id)

class Review(models.Model):
    user_id = ForeignKey(
        User,
        on_delete=DO_NOTHING,
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
    # updated_at = models.DateTimeField(auto_now=True, verbose_name="댓글 수정일시")

    def __str__(self):
        return str(self.id)

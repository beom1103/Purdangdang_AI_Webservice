from django.db import models
from sqlalchemy import true

# Create your models here.
class Plant(models.Model):    
    kor = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    rank = models.IntegerField()
    image_url = models.URLField(blank=True)
    
    def __str__(self):
        # 객체를 출력 할 때 나타나는 값 
        return f'이름: {self.kor}'
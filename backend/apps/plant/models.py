from django.db import models

# Create your models here.
class plant(models.Model):    
    kor = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    rank = models.IntegerField()
    image = models.ImageField('식물 이미지', upload_to='images')
    
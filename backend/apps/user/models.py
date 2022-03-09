from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models.deletion import CASCADE, DO_NOTHING
from django.db.models.fields.related import ForeignKey
from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.plant.models import Plant

User._meta.get_field('email')._unique = True

class UserPlant(models.Model):
    user_id = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        db_column="user_id",
        verbose_name="유저 ID",
    )
    name = models.CharField(max_length=20, verbose_name="반려식물 이름", blank=True, null=True)
    image = models.TextField(verbose_name="base64_반려식물 이미지", blank=True, null=True)
    # image = models.ImageField(upload_to="user_plants", verbose_name="반려식물 이미지", blank=True, null=True)
    order = models.IntegerField(default=1, validators=[MaxValueValidator('3'), MinValueValidator('1')], verbose_name="반려식물 순서", unique=True)
    
    def __str__(self):
        return str(self.id)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_pk = models.IntegerField(blank=True)
    email = models.EmailField(max_length=500, unique=True, blank=True)
    nickname = models.CharField(max_length=200, blank=True)
    point = models.IntegerField(default=0)
    like = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=200, blank=True)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, user_pk=instance.id)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
    



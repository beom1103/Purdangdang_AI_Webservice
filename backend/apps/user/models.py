from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models

from apps.plant.models import Plant

User._meta.get_field('email')._unique = True

class Wishlist(models.Model):
    """
        찜 리스트 
    """ 
    user_id = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        verbose_name="유저 ID",
        null=True, 
        blank=True
    )
    plant_id = models.ForeignKey(
        Plant, 
        on_delete=models.CASCADE,
        verbose_name="식물 ID",
    )

    def __str__(self):
        return str(self.id)
    
# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     user_pk = models.IntegerField(blank=True)
#     email = models.EmailField(max_length=500, unique=True, blank=True)
#     nickname = models.CharField(max_length=200, blank=True)
#     point = models.IntegerField(default=0)
#     like = models.CharField(max_length=200, blank=True)
#     phone = models.CharField(max_length=200, blank=True)

# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance, user_pk=instance.id)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()
    



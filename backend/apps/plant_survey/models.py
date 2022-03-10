from django.db import models

# Create your models here.
class Category(models.Model):    
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200)
    difficulty = models.IntegerField()
    price = models.IntegerField()
    scent = models.IntegerField()
    size = models.IntegerField()
    sunlight = models.IntegerField()
    water_cycle = models.IntegerField()
    survey_code = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return str(self.id)

class Blacklist(models.Model):  
    blacklisted_survey_code = models.CharField(max_length=20, blank=True, null=True)
    replaced_survey_code = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return str(self.id)
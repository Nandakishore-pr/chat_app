from django.db import models

# Create your models here.
class CustomUser(models.Model):
    name = models.CharField(max_length=100) 
    phone = models.IntegerField(unique=True,null=True)  
    profile_pic = models.ImageField(default='13.jpeg',
                                    upload_to='profile_images/')
    def __str__(self):
        return self.name
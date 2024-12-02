from rest_framework import serializers
from .models import CustomUser

class loginSerializer(serializers.Serializer):
    name = serializers.CharField(max_length = 100)
    phone = serializers.IntegerField()

# class UserProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'name', 'phone', 'profile_pic']
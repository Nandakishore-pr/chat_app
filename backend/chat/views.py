from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CustomUser
from .serializer import loginSerializer
import uuid
# Create your views here.


@api_view(['POST'])
def login(request):
    serializer = loginSerializer(data=request.data)
    if serializer.is_valid():
        name = serializer.validated_data['name']
        phone = serializer.validated_data['phone']

        try:
            user = CustomUser.objects.get(name=name, phone=phone)
            message = 'Login Successful'
        except CustomUser.DoesNotExist:
            user = CustomUser.objects.create(name=name, phone=phone)
            user.save()
            message = 'User Created Successfully'

        print(f"User ID: {user.id}") 
        session_token = str(uuid.uuid4())
        request.session['session_token'] = session_token
        request.session['user_id'] = user.id

        return Response({
            'message': message,
            'user_id': user.id,
            'name': user.name,
            'phone': user.phone,
            'profile_pic': user.profile_pic.url if user.profile_pic else None,
            'session_token': session_token
        }, status=status.HTTP_200_OK)


    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def search_user(request):
    phone = request.query_params.get('phone')
    if not phone:
        return Response({"error": "Phone number is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(phone=phone)
        return Response({
            'user_id': user.id,
            'name': user.name,
            'phone': user.phone,
            'profile_pic': user.profile_pic.url if user.profile_pic else None,
        }, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
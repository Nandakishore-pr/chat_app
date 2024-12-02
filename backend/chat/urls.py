from django.urls import path
from .import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('search_user/', views.search_user , name='search_user')
]
 
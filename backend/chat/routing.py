from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<logged_in_user_id>\d+)/(?P<other_user_id>\d+)/$', consumers.ChatConsumer.as_asgi()),
]
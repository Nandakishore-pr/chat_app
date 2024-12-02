import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
    
        self.logged_in_user_id = self.scope['url_route']['kwargs']['logged_in_user_id']
        self.other_user_id = self.scope['url_route']['kwargs']['other_user_id']

       # Debug logs to ensure IDs are being passed
        print(f"Logged-in user ID: {self.logged_in_user_id}")
        print(f"Other user's ID: {self.other_user_id}")

        # Ensure both IDs are valid
        if not self.logged_in_user_id or not self.other_user_id:
            await self.close()
            return

        # Create room name based on both IDs (sorted for consistency)
        self.room_group_name = f'chat_{min(self.logged_in_user_id, self.other_user_id)}_{max(self.logged_in_user_id, self.other_user_id)}'

        # Add the user to the WebSocket group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()



    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        sender_id = self.logged_in_user_id

        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender_id': sender_id
            }
        )

    async def chat_message(self, event):
        message = event['message']
        sender_id = event['sender_id']
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender_id':sender_id
        }))
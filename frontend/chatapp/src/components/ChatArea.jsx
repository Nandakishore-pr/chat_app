import React, { useEffect, useState } from 'react';
import './ChatArea.css';

const ChatArea = ({ selectedUser }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const loggedInUserId = localStorage.getItem('user_id');
  const [textareaHeight, setTextareaHeight] = useState(55);
  
  useEffect(() => {
    if (selectedUser) {
        const otherUserId = selectedUser.user_id; 
        console.log(otherUserId);
        
        const url = `ws://localhost:8000/ws/chat/${loggedInUserId}/${otherUserId}/`;
        console.log("WebSocket URL:", url, "Logged-in user ID:", loggedInUserId);
        
        const newSocket = new WebSocket(url);
        setSocket(newSocket);

        newSocket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log("Received WebSocket message:", data);
          setMessages((prevMessages) => [
              ...prevMessages,
              data // Push the full object into the messages array
          ]);
        };

        return () => {
            newSocket.close();
        };
    }
  }, [selectedUser, loggedInUserId]);

  const handleInputChange = (e) => {
    const textarea = e.target;
    setInputValue(textarea.value);

    // Reset height to auto to measure the scrollHeight
    textarea.style.height = 'auto';

    // Calculate the new height based on scrollHeight, but limit it to a maximum of 120px
    const newHeight = Math.min(textarea.scrollHeight, 120);
    setTextareaHeight(newHeight);
  };


  const handleSend = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '' && socket) {
      const messageData = { message: inputValue, sender_id: loggedInUserId };
      socket.send(JSON.stringify(messageData));
      setInputValue('');
    }
  };

  return (
      <div className="chat-container">
        <div className="chat-messages">
          {selectedUser ? (
            <div className="profile">
              <h1>{selectedUser.name}</h1>
            </div>
          ) : (
            <h1>No user selected</h1>
          )}

          {messages.map((msg, index) => {
            const isSentByLoggedInUser = msg.sender_id === loggedInUserId;

            return (
              <div
                key={index}
                className={`message-item ${isSentByLoggedInUser ? 'sent' : 'received'}`}
              >
                {/* Sender's name */}
                <div className="message-sender">
                  {isSentByLoggedInUser ? 'You' : selectedUser.name}
                </div>
                {/* Message content */}
                <div className="message-content">
                  {msg.message}
                </div>
              </div>
            );
          })}
        </div>


      <form onSubmit={handleSend}>
        <div className="chat-input">
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type a message"
            style={{ height: `${textareaHeight}px` }} // Dynamically set height
          />
          <button className="send-button" type="submit">
            {/* ↑ */}
            SEND
          </button>
        </div>
      </form>

    </div>
  );
};

export default ChatArea;
  
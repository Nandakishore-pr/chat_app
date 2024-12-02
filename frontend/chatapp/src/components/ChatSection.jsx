// import React from 'react'
// import './ChatSection.css'
// import ChatArea from './ChatArea'
// import { Profiles } from './Profiles'


// export const ChatSection = () => {
//   return (
//     <div className="container">
//       {/* Left Section */}
//       <div className="left-section">
//         <Profiles></Profiles>
//         {/* Add your content for the profile sidebar */}
//       </div>
      
//       {/* Right Section */}
//       <div className="right-section">
//         <ChatArea></ChatArea>
//         {/* Add your content for the chat area */}
//       </div>
//     </div>
//   )
// }



import React, { useState, useEffect } from 'react';
import './ChatSection.css';
import ChatArea from './ChatArea';
import { Profiles } from './Profiles';

export const ChatSection = () => {
  const [selectedUser, setSelectedUser] = useState(null); // Store the selected user here
  const [selectedUsers, setSelectedUsers] = useState([]); // List of selected users

  // Retrieve selected users from localStorage on page load
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('selectedUsers')) || [];
    setSelectedUsers(savedUsers);
  }, []);

  useEffect(() => {
    // Save selected users to localStorage whenever it changes
    localStorage.setItem('selectedUsers', JSON.stringify(selectedUsers));
  }, [selectedUsers]);

  return (
    <div className="container">
      {/* Left Section */}
      <div className="left-section">
        <Profiles 
          setSelectedUser={setSelectedUser} 
          selectedUsers={selectedUsers} 
          setSelectedUsers={setSelectedUsers} 
        />
      </div>
      
      {/* Right Section */}
      <div className="right-section">
        {selectedUser ? (
          <ChatArea selectedUser={selectedUser} />
        ) : (
          <div className='first-text'>Select a user to chat with</div>
        )}
       
      </div>
    </div>
  );
};




// import React from 'react';
// import './ChatSection.css';
// import ChatArea from './ChatArea';
// import { Profiles } from './Profiles';

// export const ChatSection = ({ currentUser, chatWithUser }) => {
//   return (
//     <div className="container">
//       {/* Left Section */}
//       <div className="left-section">
//         <Profiles currentUser={currentUser} />
//         {/* Add your content for the profile sidebar */}
//       </div>
      
//       {/* Right Section */}
//       <div className="right-section">
//         {chatWithUser ? (
//           <ChatArea 
//             currentUser={currentUser} 
//             chatWithUser={chatWithUser} 
//           />
//         ) : (
//           <div>Select a user to chat with</div>
//         )}
//       </div>
//     </div>
//   );
// };

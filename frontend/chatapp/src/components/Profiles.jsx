// import React, { useEffect, useState } from 'react';
// import './Profiles.css';
// import profileImage from '../assets/13.jpeg';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export const Profiles = () => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResult, setSearchResult] = useState(null);
//   const [selectedUsers, setSelectedUsers] = useState([]); // Store selected users
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedName = localStorage.getItem('user_name');
//     if (storedName) {
//       setUserName(storedName);
//     }

//     // Retrieve selected users from localStorage on page load
//     const savedUsers = JSON.parse(localStorage.getItem('selectedUsers')) || [];
//     setSelectedUsers(savedUsers);
//   }, []);

//   useEffect(() => {
//     // Save selected users to localStorage whenever it changes
//     localStorage.setItem('selectedUsers', JSON.stringify(selectedUsers));
//   }, [selectedUsers]);

//   const handleLogout = (event) => {
//     event.preventDefault();
//     localStorage.removeItem('session_token');
//     navigate('/login');
//   };

//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   const handleSearch = async (event) => {
//     if (event.key === 'Enter' && searchQuery) {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/search_user/`, {
//           params: { phone: searchQuery }
//         });

//         if (response.data && response.data.name) {
//           setSearchResult(response.data); // Set the result if the user is found
//         } else {
//           setSearchResult('No user found'); // If no user is found, display this message
//         }

//         setSearchQuery('');
//       } catch (error) {
//         console.error('Error searching for user:', error);
//         setSearchResult('No user found'); // Display a fallback message on error
//       }
//     }
//   };

//   const handleUserClick = (user) => {
//     // Check if the user is already in the selected users list
//     if (!selectedUsers.some((selectedUser) => selectedUser.phone === user.phone)) {
//       setSelectedUsers([...selectedUsers, user]); // Add user if not already in the list
//     }
//     setSearchResult(null);
//     setDropdownVisible(false); 
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <div className="profile-info">
//           <h2>{userName || "User"}</h2>

//           {/* Search Bar */}
//           <div className="search-bar">
//             <input
//               type="text"
//               placeholder="Search by phone number..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleSearch} // Listen for Enter key press
//             />
//           </div>

//           <button className="profile-button" onClick={toggleDropdown}>
//             <img src={profileImage} alt="profile image" />
//           </button>
//         </div>

//         {dropdownVisible && (
//           <div className="dropdown-menu">
//             <div className="dropdown-item">Profile</div>
//             <div onClick={handleLogout} className="dropdown-item">Logout</div>
//           </div>
//         )}
//       </div>

//       {searchResult && (
//         <div className="search-result-dropdown">
//           <div className="search-result-item">
//             {/* Check if the result is a string message (e.g., "No user found") */}
//             {typeof searchResult === 'string' ? (
//               <p>{searchResult}</p>
//             ) : (
//               <p onClick={() => handleUserClick(searchResult)}>{`${searchResult.name}`}</p> // Click to select the user
//             )}
//           </div>
//         </div>
//       )}

//       <hr className="profile-divider" />

//       {selectedUsers.map((user, index) => (
//         <div className="selected-user-row" key={index}>
//           <div className="user-info">
//             {/* Display profile image */}
//             <img 
//               src={user.profile_image || profileImage} // Use default profileImage if not found
//               alt={`${user.name}'s profile`} 
//               className="user-profile-image"
//             />
//             <p>{`${user.name}`}</p>
//           </div>
//         </div>
//       ))}

//     </div>
//   );
// };



// import React, { useEffect, useState } from 'react';
// import './Profiles.css';
// import profileImage from '../assets/13.jpeg';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export const Profiles = ({ selectedUsers, setSelectedUsers }) => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResult, setSearchResult] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedName = localStorage.getItem('user_name');
//     if (storedName) {
//       setUserName(storedName);
//     }
//   }, []);

//   const handleLogout = (event) => {
//     event.preventDefault();
//     localStorage.removeItem('session_token');
//     navigate('/login');
//   };

//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   const handleSearch = async (event) => {
//     if (event.key === 'Enter' && searchQuery) {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/search_user/`, {
//           params: { phone: searchQuery }
//         });

//         if (response.data && response.data.name) {
//           setSearchResult(response.data); // Set the result if the user is found
//         } else {
//           setSearchResult('No user found'); // If no user is found, display this message
//         }

//         setSearchQuery('');
//       } catch (error) {
//         console.error('Error searching for user:', error);
//         setSearchResult('No user found'); // Display a fallback message on error
//       }
//     }
//   };

//   const handleUserClick = (user) => {
//     // Check if the user is already in the selected users list
//     if (!selectedUsers.some((selectedUser) => selectedUser.phone === user.phone)) {
//       setSelectedUsers([...selectedUsers, user]); // Add user if not already in the list
//     }
//     setSearchResult(null);
//     setDropdownVisible(false); 
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <div className="profile-info">
//           <h2>{userName || "User"}</h2>

//           {/* Search Bar */}
//           <div className="search-bar">
//             <input
//               type="text"
//               placeholder="Search by phone number..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleSearch} // Listen for Enter key press
//             />
//           </div>

//           <button className="profile-button" onClick={toggleDropdown}>
//             <img src={profileImage} alt="profile image" />
//           </button>
//         </div>

//         {dropdownVisible && (
//           <div className="dropdown-menu">
//             <div className="dropdown-item">Profile</div>
//             <div onClick={handleLogout} className="dropdown-item">Logout</div>
//           </div>
//         )}
//       </div>

//       {searchResult && (
//         <div className="search-result-dropdown">
//           <div className="search-result-item">
//             {/* Check if the result is a string message (e.g., "No user found") */}
//             {typeof searchResult === 'string' ? (
//               <p>{searchResult}</p>
//             ) : (
//               <p onClick={() => handleUserClick(searchResult)}>{`${searchResult.name}`}</p> // Click to select the user
//             )}
//           </div>
//         </div>
//       )}

//       <hr className="profile-divider" />

//       {selectedUsers.map((user, index) => (
//         <div className="selected-user-row" key={index}>
//           <div className="user-info">
//             {/* Display profile image */}
//             <img 
//               src={user.profile_image || profileImage} // Use default profileImage if not found
//               alt={`${user.name}'s profile`} 
//               className="user-profile-image"
//             />
//             <p>{`${user.name}`}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };



import React, { useState, useEffect } from 'react';
import './Profiles.css';
import profileImage from '../assets/13.jpeg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Profiles = ({ setSelectedUser, selectedUsers, setSelectedUsers }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('user_name');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('session_token');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSearch = async (event) => {
    if (event.key === 'Enter' && searchQuery) {
      try {
        const response = await axios.get(`http://localhost:8000/api/search_user/`, {
          params: { phone: searchQuery }
        });

        if (response.data && response.data.name) {
          setSearchResult(response.data); // Set the result if the user is found
        } else {
          setSearchResult('No user found'); // If no user is found, display this message
        }

        setSearchQuery('');
      } catch (error) {
        console.error('Error searching for user:', error);
        setSearchResult('No user found'); // Display a fallback message on error
      }
    }
  };

  const handleUserClick = (user) => {
    // Pass the selected user to the parent component (ChatSection)
    
    
    
    
    setSelectedUser(user); // For displaying in the chat area
    setSelectedUsers((prevSelectedUsers) => {
      // Check if the user is already in the list before adding
      if (!prevSelectedUsers.some((selectedUser) => selectedUser.phone === user.phone)) {
        return [...prevSelectedUsers, user];
      }
      return prevSelectedUsers;
    });
    setSearchResult(null);
    setDropdownVisible(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <h2>{userName || "User"}</h2>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by phone number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch} // Listen for Enter key press
            />
          </div>

          <button className="profile-button" onClick={toggleDropdown}>
            <img src={profileImage} alt="profile image" />
          </button>
        </div>

        {dropdownVisible && (
          <div className="dropdown-menu">
            <div className="dropdown-item">Profile</div>
            <div onClick={handleLogout} className="dropdown-item">Logout</div>
          </div>
        )}
      </div>

      {searchResult && (
        <div className="search-result-dropdown">
          <div className="search-result-item">
            {/* Check if the result is a string message (e.g., "No user found") */}
            {typeof searchResult === 'string' ? (
              <p>{searchResult}</p>
            ) : (
              <p onClick={() => handleUserClick(searchResult)}>{`${searchResult.name}`}</p> // Click to select the user
            )}
          </div>
        </div>
      )}

      <hr className="profile-divider" />

      {/* Display selected users in rows */}
      <div className="profile-rows">
        {selectedUsers.map((user, index) => (
          <div 
            className="selected-user-row" 
            key={index}
            onClick={() => {
              console.log(user.user_id);
              
              setSelectedUser(user)}} // Click to update the chat area
          >
            <div className="user-info">
              <img 
                src={user.profile_image || profileImage} // Use default profileImage if not found
                alt={`${user.name}'s profile`} 
                className="user-profile-image"
              />
              <p>{user.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

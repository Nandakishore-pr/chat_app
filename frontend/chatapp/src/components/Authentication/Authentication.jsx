import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './Authentication.css';
import { useNavigate } from 'react-router-dom';
// import backgroundImage from '../../assets/background.jpg';

const Authentication = () => {
    const navigate = useNavigate();
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('');

    const handleLogin = async (event) => {
      event.preventDefault();
  
      try {
          const response = await fetch('http://localhost:8000/api/login/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, phone }),
          });
  
          if (response.ok) {
              const data = await response.json();
              console.log("response data:",data);
              
              localStorage.setItem('session_token', data.session_token);
              localStorage.setItem('user_name', data.name);
              localStorage.setItem('user_id', data.user_id); // Store user_id in localStorage
              console.log(data.message);
              console.log(`User ID: ${data.user_id}`); // Debugging
  
              navigate('/');
          } else {
              const errorData = await response.json();
              console.error('Error:', errorData);
              alert(errorData.message || 'Failed to login');
          }
      } catch (error) {
          console.error('Request failed:', error);
          alert('Please try again later');
      }
  };
  
  
    return (
      <div className="logincontainer">
        <div className="loginform-container">
          <h2>TALKIFY</h2>
          <form onSubmit={handleLogin}>
            <div className="loginform-group">
              <TextField
                className="text"
                id="standard-basic"
                label="Enter Your Name"
                variant="standard"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="loginform-group">
              <TextField
                className="text"
                id="standard-basic"
                label="Enter Your Phone Number"
                variant="standard"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {/* <button className='login'>
              LOGIN
            </button> */}
            <div className='login'>
            <Button  type='submit' variant="outlined">LOGIN</Button>
            </div>
          </form>
        </div>
    </div>
    
  );
};

export default Authentication;

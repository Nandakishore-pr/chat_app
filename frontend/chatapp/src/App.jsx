import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChatSection } from './components/ChatSection'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Authentication from './components/Authentication/Authentication'
import PrivateRoute from './PrivateRoute';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
            <ChatSection />
            </PrivateRoute>} />
          <Route path="/login" element={<Authentication/>}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App


// import { useState } from 'react';
// import './App.css';
// import { ChatSection } from './components/ChatSection';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Authentication from './components/Authentication/Authentication';
// import PrivateRoute from './PrivateRoute';

// function App() {
//   const [currentUser, setCurrentUser] = useState(null); // Stores the current logged-in user
//   const [chatWithUser, setChatWithUser] = useState(null); // Stores the user selected for chat

//   // You could populate currentUser and chatWithUser based on your app's authentication logic
//   // For example, you could fetch current user data after a successful login

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={
//           <PrivateRoute>
//             <ChatSection 
//               currentUser={currentUser} 
//               chatWithUser={chatWithUser} 
//             />
//           </PrivateRoute>} />
//         <Route path="/login" element={<Authentication setCurrentUser={setCurrentUser} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


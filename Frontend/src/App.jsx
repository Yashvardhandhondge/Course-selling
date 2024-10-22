// import { useState } from 'react';
// import './App.css';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import SignUp from './components/SignUp';;
// import { authService } from './services/authservices';
// import RootLayout from './Layout';
// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <Router>
//       <Routes>
//       <RootLayout>
//         <Route exact path='/' element={<HomePage />} />
        
//         {/* Protecting routes with conditional rendering */}
//         <Route 
//           path="/signup" 
//           element={authService.isAuthenticated() ? <Navigate to="/" /> : <SignUp />} 
//         />
// {/*         
//         <Route 
//           path="/signin" 
//           element={authService.isAuthenticated() ? <Navigate to="/" /> : <SignIn />} 
//         />
        
//         <Route 
//           path="/admin/signup" 
//           element={authService.isAuthenticated(true) ? <Navigate to="/" /> : <AdminSignUp />} 
//         />
        
//         <Route 
//           path="/admin/signin" 
//           element={authService.isAuthenticated(true) ? <Navigate to="/" /> : <AdminSignIn />} 
//         /> */}
//         </RootLayout>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import { authService } from './services/authservices';
import RootLayout from './Layout';

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route 
            path="/signup" 
            element={authService.isAuthenticated() ? <Navigate to="/" /> : <SignUp />} 
          />
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;

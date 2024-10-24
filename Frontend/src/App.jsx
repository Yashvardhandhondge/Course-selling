

import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
// import SignUp from './components/SignUp';
import Signup from './Components/Signup';
import AdminSignup from './components/AdminSignup';
import AdminSignin from './components/AdminSigin';
import Signin from './components/Signin';
import { authService } from './services/authservices';


import RootLayout from './Layout';

function App() {
  return (
  
    <Router>
      <RootLayout>
        <Routes >
          <Route exact path='/' element={<HomePage />} />
          <Route 
            path="/signup" 
            element={authService.isAuthenticated() ? <Navigate to="/" /> : <Signup />} 
          />
          <Route
          path='/signin'
          element={authService.isAuthenticated()? <Navigate to='/' /> : <Signin></Signin>}
          />
           <Route
          path='/admin/signup'
          element={authService.isAuthenticated()? <Navigate to='/' /> : <AdminSignup/>}
          />
          <Route 
          path='/admin/signin'
          element={authService.isAuthenticated()? <Navigate to='/' /> :<AdminSignin/> }
          />
          


        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;

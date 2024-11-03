

import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/Home/HomePage';

import Signin from './components/User/Signin'
import AdminSignup from './components/Admin/AdminSignup';
import AdminSignin from './components/Admin/AdminSigin';
import Signup from './components/User/Signup';
import { authService } from './services/authservices';
import UserLandingpage from './components/User/UserLandingpage'
import AdminLandingPage from './components/Admin/AdminLandingPage';
import AdminProfile from './components/Admin/AdminProfile';
import CourseFormModal from './components/Admin/CourseModalForm';
import CourseDetails from './components/Admin/CoursePage';
import AddLessons from './components/Admin/Addlessons';
import PaymentConfirmation from './components/User/PaymentConfiguration';
import CourseDetailsPage from './components/User/CourseDeatilsPage';
import UserProfile from './components/User/UserProfile';
import EditUserProfile from './components/User/Edits';
import UserDashboard from './components/User/Dashboard';
import Card from './components/Admin/Card';
import CreatedCourses from './components/Admin/CreatedCourses';
import PurchasedCourses from './components/User/PurchasedCourses';
import Wishlist from './components/User/Wishlist';
function App() {
  return (
  
    <Router>
      
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
          <Route
          path='/user/Landing'
          element={authService.isAuthenticated() ? <Navigate to='/'/> : <UserLandingpage/>}
          />
         <Route
         path='/admin/Landing'
         element={authService.isAuthenticated() ? <Navigate to='/'/> : <AdminLandingPage/>}
         />
         <Route
         path='/admin/profile'
         element={authService.isAuthenticated() ? <Navigate to='/' />:<AdminProfile/>}
         ></Route>
         <Route
         path='/admin/create'
         element={authService.isAuthenticated() ? <Navigate to='/' />:<CourseFormModal/>}
         > </Route>
         <Route
         path="/admin/course/:courseId"
         element={authService.isAuthenticated()? <Navigate to='/' />:<CourseDetails/>}
         ></Route>
         <Route
         path="/admin/courses"
         element={authService.isAuthenticated()? <Navigate to='/' />:<CreatedCourses/>}
         ></Route>
         <Route
         path='/admin/add-lesson/:courseId'
         
         element={authService.isAuthenticated() ? <Navigate to='/'/>:<AddLessons/> }
         > </Route>
         <Route
         path='/payment'
         element={authService.isAuthenticated() ? <Navigate to='/' /> : <PaymentConfirmation/>}
         ></Route>
         <Route
         path='/user/course'
         element={authService.isAuthenticated() ? <Navigate to='/' /> : <CourseDetailsPage/>}
         >

         </Route>
         <Route
         path='/user/profile'
         element={authService.isAuthenticated() ? <Navigate to='/'/>:<UserProfile/>}
         ></Route>
         <Route
         path='/user/edit'
         element={authService.isAuthenticated() ? <Navigate to='/'/>: <EditUserProfile/>}
         >
         </Route>
         <Route
         path='/user/dashboard'
         element={authService.isAuthenticated() ? <Navigate to='/'/>: <UserDashboard/>}
         >
         </Route>
         <Route
         path='/user/purchased'
         element={authService.isAuthenticated() ? <Navigate to='/' /> : <PurchasedCourses/>}
         >
         </Route>
         <Route
         path='/user/wishlist'
         element={authService.isAuthenticated() ? <Navigate to='/' /> : <Wishlist/>}
         >
         </Route>
        </Routes>
    
    </Router>
  );
}

export default App;

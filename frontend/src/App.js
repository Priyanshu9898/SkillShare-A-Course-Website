import React, { useEffect } from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home.js';
import Navbar from './components/Navbar/Navbar.js';
import Login from './components/Authentication/Login.js';
import Courses from './components/Courses/Courses.jsx';
import Register from './components/Authentication/Register.js';
import ForgotPassword from './components/Authentication/ForgotPassword.js';
import ResetPassword from './components/Authentication/ResetPassword.js';
import Contact from './components/Contact/Contact.js';
import Request from './components/RequestCourse/Request.js';
import About from './components/About/About.js';
import Subscribe from './components/Payment/Subscribe.js';
import PaymentFail from './components/Payment/PaymentFail.js';
import PaymentSuccess from './components/Payment/PaymentSuccess.js';
import NotFound from './components/ErrorPage/NotFound.js';
import CourseDetail from './components/CourseDetail/CourseDetail.js';
import Profile from './components/Profile/Profile.js';
import ChangePassword from './components/Profile/ChangePassword.js';
import UpdateProfile from './components/Profile/UpdateProfile.js';

import Users from "./components/Admin/Users/Users.js";
import CreateCourses from './components/Admin/CreateCourses/CreateCourses.js';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses.js';
import Dashboard from './components/Admin/Dashboard/Dashboard.js';
import { useDispatch, useSelector } from 'react-redux';
import toast, {Toaster} from "react-hot-toast";
import { myProfile } from './redux/actions/user.js';
import {ProtectedRoute} from "protected-route-react";
import Loader from './components/Loader/Loader.js';
import Footer from './components/Footer/Footer.js';


const App = () => {

  // window.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // })

  const {isAuthenticated, user, error, message, loading} = useSelector(state => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(myProfile());
  }, [dispatch]);

  return (
    <BrowserRouter>

      {
        loading? (
          <>
            <Loader />
          </>
        ) : (

          <>
            <Navbar isAuthenticated = {isAuthenticated} user = {user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<ProtectedRoute isAuthenticated= {!isAuthenticated} redirect="/"><Login /></ProtectedRoute>} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><CourseDetail user={user}/></ProtectedRoute>} />
        <Route path="/register" element={<ProtectedRoute isAuthenticated= {!isAuthenticated} redirect="/"><Register /></ProtectedRoute>} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<Request />} />
        <Route path="/about" element={<About />} />
        <Route path="/subscribe" element={<ProtectedRoute isAuthenticated= {isAuthenticated}><Subscribe user={user} /></ProtectedRoute>} />
        <Route path="/paymentfail" element={<PaymentFail />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={
        <ProtectedRoute isAuthenticated= {isAuthenticated}>
          <Profile user ={user} />
          </ProtectedRoute>} />
        <Route path="/changepassword" element={<ProtectedRoute isAuthenticated= {isAuthenticated}><ChangePassword /></ProtectedRoute>} />
        <Route path="/updateprofile"  element={<ProtectedRoute isAuthenticated= {isAuthenticated}><UpdateProfile user={user} /></ProtectedRoute>} />


        {/* Admin Routes */}
        <Route path="/admin/admincourses" element={<ProtectedRoute isAuthenticated= {isAuthenticated} adminRoute={true} isAdmin = {user && user.role === "admin"}><AdminCourses /></ProtectedRoute>} />
        <Route path="/admin/createcourses" element={<ProtectedRoute isAuthenticated= {isAuthenticated} adminRoute={true} isAdmin = {user && user.role === "admin"}><CreateCourses /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute isAuthenticated= {isAuthenticated} adminRoute={true} isAdmin = {user && user.role === "admin"}><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute isAuthenticated= {isAuthenticated} adminRoute={true} isAdmin = {user && user.role === "admin"}><Users /></ProtectedRoute>} />

      </Routes>
          <Footer/>
          </>
        )
      }

      
      <Toaster />
    </BrowserRouter>
  )
}

export default App
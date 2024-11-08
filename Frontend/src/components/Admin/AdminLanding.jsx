import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './Navbar';
import CourseCard from './Card';
import { adminAPI } from '../../services/adminApi';
import Chatbot from '../Home/Chatbot';
const AdminLandingPage = React.memo(() => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await adminAPI.getAdmin(token);
          setProfile(response.data.admin);
        } catch (e) {
          console.error('Failed to fetch profile:', e);
        }
      }
    };
    fetchProfile();
  }, []);

  const openCreateCourse = useCallback(() => {
    navigate('/admin/create');
  }, [navigate]);

  return (
    <div className="flex">
      <AdminNavbar />
      <div className="flex-grow min-h-screen bg-black p-4 font-poppins ml-12 sm:ml-12  lg:ml-52">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl text-purple-500">Admin Dashboard</h1>
          {profile && (
            <div className="flex items-center">
              <img
                src={profile.image}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="text-white">{profile.firstname}</span>
            </div>
          )}
        </div>

        <div className="bg-gray-800 p-4 rounded mb-6">
          <h2 className="text-lg text-white mb-2">Welcome, Admin!</h2>
          <p className="text-gray-300">
            As an admin, you have the ability to manage courses and assist educators in creating high-quality content. Your role is crucial in ensuring that our platform remains a valuable resource for students. You can create new courses, review existing ones, and support our educators in their efforts to make a difference.
          </p>
        </div>

        <div className="flex justify-center">
          <p className="text-purple-500 font-semibold text-2xl mt-6">
            Ready to Create a Course?
          </p>
          <button
            onClick={openCreateCourse}
            className="bg-purple-600 ml-4 mt-5 text-white py-2 px-4 rounded"
          >
            Create New Course
          </button>
        </div>

        <div className="text-2xl mt-10 text-purple-500">
          <h1 className="ml-8">Created Courses:</h1>
          <CourseCard />
        </div>
      </div>
      <Chatbot/>
    </div>
  );
});

export default AdminLandingPage;
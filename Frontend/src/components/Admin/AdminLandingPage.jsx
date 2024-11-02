import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import CourseCard from './Card';

const AdminLandingPage = React.memo(() => {
  const navigate = useNavigate();


  const openCreateCourse = useCallback(() => {
    navigate('/admin/create');
  }, [navigate]);

  return (
    <div className="w-full h-screen bg-black p-4 font-poppins">
      <Navbar />
      <div className="border-t-[1px] border-zinc-700 mt-2 flex justify-center"></div>
      <div className="flex justify-center">
        <p className="text-purple-500 font-semibold text-2xl mt-6">
          Want to Create a Course:
        </p>
        <button
          onClick={openCreateCourse}
          className="bg-purple-600 ml-4 mt-5 text-white py-2 px-4 rounded"
        >
          Create Course
        </button>
      </div>
      <div className="text-2xl mt-10 text-purple-500">
        <h1 className="ml-8">Created Courses:</h1>
        <CourseCard />
      </div>
    </div>
  );
});

export default AdminLandingPage;

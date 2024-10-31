import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import CourseCard from './Card';

function AdminLandingPage() {
  const navigate = useNavigate();
  const openCreateCourse = () => {
    navigate('/admin/create');
  };

  return (
    <div className="w-full h-screen bg-black p-4">
      <Navbar />
      <div className="border-t-[1px] border-zinc-700 mt-2 flex justify-center"></div>
      <button
        onClick={openCreateCourse}
        className="bg-purple-600 text-white py-2 px-4 rounded mt-4"
      >
        Create Course
      </button>
      <CourseCard />
    </div>
  );
}

export default AdminLandingPage;

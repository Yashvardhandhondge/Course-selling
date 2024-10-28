import React, { useState } from 'react'
import Navbar from './Admin/Navbar'
import CourseFormModal from './Admin/CourseModalForm';
function AdminLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialCourseData, setInitialCourseData] = useState(null);
  const token = localStorage.getItem('token');
  const openCreateCourse = () => {
    setInitialCourseData(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className='w-full h-screen bg-black p-4 '>
  <Navbar />
  
  <div className='border-t-[1px] border-zinc-700 mt-2 flex justify-center '></div>
  <button
          onClick={openCreateCourse}
          className="bg-purple-600 text-white py-2 px-4 rounded mt-4"
        >
          Create Course
        </button>
        <CourseFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={initialCourseData}
        token={token}
      />
   </div>
  )
}

export default AdminLandingPage
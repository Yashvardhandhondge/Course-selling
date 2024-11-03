import React from 'react'
import Card from './Card'
import AdminNavbar from './Navbar'
import Fetchadmin from './fetchadmin'
import Chatbot from '../Home/Chatbot'
function CreatedCourses() {
  return (
  
    <div className="flex">
      <AdminNavbar />
      <div className="flex-grow  h-screen bg-black p-4 font-poppins text-white font-boldml-12 lg:ml-64">
        <div className='flex text-bold font-bold  justify-between'>
           <p className='text-xl'>Created Courses :</p> 
            <Fetchadmin/>
            </div>
        <div className="flex justify-between items-center mb-4">
            <Card></Card>
    </div>
    </div>
    <Chatbot/>
    </div>
  )
}

export default CreatedCourses
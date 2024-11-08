import React from 'react'
import AdminNavbar from './Navbar'
import Admindetails from './Admindetails'
import Chatbot from '../Home/Chatbot'
function AdminProfile() {
  return (
    <div className="flex">
      <AdminNavbar />
      <div className="flex-grow min-h-screen bg-black p-4 font-poppins ml-12 sm:ml-12  lg:ml-52">
        <div className="flex justify-between items-center mb-4">
       <Admindetails/>
       <Chatbot/>
   </div>
   </div>
   </div>
  )
}

export default AdminProfile
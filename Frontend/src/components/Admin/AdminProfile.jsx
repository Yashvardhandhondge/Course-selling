import React from 'react'
import ProfileNav from './ProfileNav'
import Admindetails from './Admindetails'
import Chatbot from '../Home/Chatbot'
function AdminProfile() {
  return (
   <div className='w-full h-screen bg-black' >
       <ProfileNav />
       <div className='border-t-[1px] border-zinc-700 mt-2 flex justify-center '></div>
       <Admindetails/>
       <Chatbot/>
   </div>
  )
}

export default AdminProfile
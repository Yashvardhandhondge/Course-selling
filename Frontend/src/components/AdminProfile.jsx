import React from 'react'
import ProfileNav from './Admin/ProfileNav'
import Admindetails from './Admin/Admindetails'
function AdminProfile() {
  return (
   <div className='w-full h-screen bg-black' >
       <ProfileNav />
       <div className='border-t-[1px] border-zinc-700 mt-2 flex justify-center '></div>
       <Admindetails/>
   </div>
  )
}

export default AdminProfile
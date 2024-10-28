import React from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { PiBasketballBold } from "react-icons/pi";

function ProfileNav() {
const navigate = useNavigate()
    function handleLogout(){
        localStorage.removeItem('token')
        navigate('/admin/signup')
    }
  return (
    <div>
    <div className="text-3xl flex justify-start  ">
        <Link to='/admin/landing' className='text-white flex'>
             <PiBasketballBold className='text-blue-500 h-10 mr-5' /> Koursely  </Link>
             <div className="h-[40px] border-r border-r-white ml-8 max-h-screen ">.</div>
            <div className="text-white ml-[470px]">Admin Profile </div>
          
            <button onClick={handleLogout} className="bg-blue-400 font-serif text-sm text-black ml-[550px] mt-2 shadow border-blue-400 px-4 rounded hover:bg-black hover:text-white border border-solid">Logout</button>
            
             </div></div>
  )
}

export default ProfileNav
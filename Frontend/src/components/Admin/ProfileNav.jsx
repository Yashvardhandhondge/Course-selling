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
    <div className="text-3xl p-2 flex justify-start  ">
        <Link to='/admin/landing' className='text-white flex'>
        <PiBasketballBold className='text-blue-500  text-5xl p-2' /> <p className="text-3xl mt-1 font-serif text-white">Koursely</p>  
        </Link>
          
            <div className="text-white flex mt-1 ml-[470px]"><p>Admin</p><p>Profile</p>  </div>
          
            <button onClick={handleLogout} className="bg-blue-400 font-serif text-sm text-black ml-[400px] shadow border-white px-4 py-3 rounded hover:bg-black hover:text-white border border-solid">Logout</button>
            
             </div></div>
  )
}

export default ProfileNav
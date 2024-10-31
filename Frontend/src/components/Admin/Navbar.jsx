import { PiBasketballBold } from "react-icons/pi";
import { Link,useNavigate } from "react-router-dom";
import { adminAPI } from "../../services/adminApi";
import Koursely from "./Koursely";

import React, { useEffect, useState } from 'react'

function Navbar() {
  const navigate = useNavigate();
  const [profile,setProfile] = useState(null);
   
  useEffect(()=>{
    const fetchprofile=async()=>{
    const token = localStorage.getItem('token');
    if(token){
      try{
        const response = await adminAPI.getAdmin(token);
        setProfile(response.data.admin);
        console.log(response.data.admin);
      }catch(e){
        console.error('Failed to fetch profile:',e);
      }
    }
    }
    fetchprofile();
  },[])

  function handlelogout(){
localStorage.removeItem("token");
navigate('/admin/signin')
  }


  return (
    <div>
   <div className="text-3xl flex justify-start  ">
    <Link to='/admin/landing' className="flex">
   <PiBasketballBold className='text-blue-500  text-5xl p-2' /> <p className="text-3xl mt-1 font-serif text-white">Koursely</p>  </Link>

            <div className="text-white font-serif ml-[300px]">Admin Panel</div>
         <div className=" ml-[300px]  space-x-4">
         {profile && (
          <Link to="/admin/profile">
            <div className="flex - cursor-pointer">
              <img
                src={profile.image} 
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-white font-serif">{profile.firstname} </span>
            </div>
          </Link>
        )}
         </div>
            <button onClick={handlelogout} className="bg-blue-400 font-serif text-sm text-black ml-[100px] shadow border-blue-400 px-6 py-3 rounded hover:bg-black hover:text-white border border-solid">Logout</button>
            </div>  
            

</div>
            
            
            
  )
}

export default Navbar
import { PiBasketballBold } from "react-icons/pi";
import { Link,useNavigate } from "react-router-dom";
import { adminAPI } from "../../services/adminApi";


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
navigate('/login')
  }


  return (
    <div>
   <div className="text-3xl flex justify-start  ">
            <PiBasketballBold className='text-blue-500 h-10 mr-5' /> <p className="text-3xl text-white">Koursely</p>  
            <div className="h-full border-r border-r-white ml-11 ">.</div>
            <div className="text-white ml-[300px]">Admin Dashborad </div>
         <div className=" ml-[200px]  space-x-4">
         {profile && (
          <Link to="/admin/profile">
            <div className="flex - cursor-pointer">
              <img
                src={profile.image} 
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-white ">{profile.firstname} </span>
            </div>
          </Link>
        )}
         </div>
            <button onClick={handlelogout} className="bg-blue-400 font-serif text-sm text-black ml-[200px] shadow border-blue-400 px-4 rounded hover:bg-black hover:text-white border border-solid">Logout</button>
            </div>  
            

</div>
            
            
            
  )
}

export default Navbar
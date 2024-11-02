import React, { useState } from 'react'
import { CiCircleChevDown } from "react-icons/ci";
import { Link } from 'react-router-dom';
function Admin() {
    const [showAdminOptions,setAdminOptions]=useState(false)
  return (
    
    <div className="relative">
    <button
        className="flex items-center px-4 py-2 text-white font-poppins text-lg  rounded-lg hover:bg-purple-700 hover:text-black transition duration-300 scale-95"
        onClick={() => setAdminOptions(!showAdminOptions)}
    >
        Educator <CiCircleChevDown className="ml-2 text-xl" />
    </button>
    {showAdminOptions && (
        <div className="absolute left-0 mt-2 w-40  shadow-lg rounded-md">
            <Link
                to="/admin/signin"
                className="block px-4 py-2 text-white  hover:bg-purple-700 hover:text-black font-poppins transition-transform hover:scale-95 duration-300"
            >
                Admin Sign In
            </Link>
            <Link
                to="/admin/signup"
                className="block px-4 py-2 text-white hover:bg-purple-700 font-poppins hover:text-black hover:scale-95 transition duration-300"
            >
                Admin Sign Up
            </Link>
        </div>
    )}
</div>
  )
}

export default Admin
import React, { useMemo, useState } from 'react'
import { CiCircleChevDown } from "react-icons/ci";
import { Link } from 'react-router-dom';
function Admin() {
    const [showAdminOptions,setAdminOptions]=useState(false)
    const cssclass = useMemo(()=>"block px-3 py-2 sm:px-4  text-white   hover:bg-purple-700 hover:text-black font-poppins transition-transform hover:scale-95 duration-300 text-sm sm:text-base",[])
  return (
    
    <div className="relative">
    <button
        className="flex items-center px-3 py-2 sm:px-4 sm:py-2  text-white font-poppins text-sm sm:text-lg  rounded-lg bg-purple-600 transition-transfer   hover:bg-purple-700 hover:text-black transition duration-300 scale-95"
        onClick={() => setAdminOptions(!showAdminOptions)}
    >
        Educator <CiCircleChevDown className="ml-2 text-xl" />
    </button>
    {showAdminOptions && (
        <div className="absolute left-0 mt-2 w-36 sm:w-40 bg-purple-600  shadow-lg rounded-md">
            <Link
                to="/admin/signin"
                className={cssclass}
            >
                Admin Sign In
            </Link>
            <Link
                to="/admin/signup"
                className={cssclass}
            >
                Admin Sign Up
            </Link>
        </div>
    )}
</div>
  )
}

export default Admin
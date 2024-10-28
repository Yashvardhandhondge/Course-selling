import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { CiCircleChevDown } from "react-icons/ci";

function Student() {
    const [showUserOptions,setShowUserOptions]=useState(false);
  return (
    <div className="relative">
    <button
        className="flex items-center px-4 py-2 font-serif  text-lg text-white  rounded-lg bg- hover:bg-blue-400 hover:text-black transition duration-300"
        onClick={() => setShowUserOptions(!showUserOptions)}
    >
        Student <CiCircleChevDown className="ml-2 text-xl" />
    </button>
    {showUserOptions && (
        <div className="absolute left-0 mt-2 w-40 bg-black shadow-lg rounded-md">
            <Link
                to="/signin"
                className="block px-4 py-2 text-white font-serif hover:bg-blue-400 hover:text-black transition duration-300"
            >
                Sign In
            </Link>
            <Link
                to="/signup"
                className="block px-4 py-2 text-white font-serif hover:bg-blue-400 hover:text-white transition duration-300"
            >
                Sign Up
            </Link>
        </div>
    )}
</div>
  )
}

export default Student
import React, { useState,useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CiCircleChevDown } from "react-icons/ci";

const Student = React.memo(() => {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const cssclass = useMemo(()=>"block px-3 py-2 sm:px-4  text-white   hover:bg-purple-700 hover:text-black font-poppins transition-transform hover:scale-95 duration-300 text-sm sm:text-base",[])
  return (
    <div className="relative">
      <button
        className="flex items-center px-3 py-2 sm:px-4 sm:py-2  text-white font-poppins text-sm sm:text-lg  rounded-lg bg-purple-600 transition-transfer   hover:bg-purple-700 hover:text-black transition duration-300 scale-95"
        onClick={() => setShowUserOptions(prev => !prev)}
      >
        Student <CiCircleChevDown className="ml-2 text-xl" />
      </button>
      {showUserOptions && (
        <div className="absolute left-0 mt-2 w-40 shadow-lg rounded-md bg-purple-600">
          <Link
            to="/signin"
            className={cssclass}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className={cssclass}
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
});

export default Student;

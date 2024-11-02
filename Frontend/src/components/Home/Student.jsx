import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiCircleChevDown } from "react-icons/ci";

const Student = React.memo(() => {
  const [showUserOptions, setShowUserOptions] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center px-4 py-2 font-poppins text-lg text-white rounded-lg bg-purple-600 hover:bg-purple-700 hover:text-black transition duration-300"
        onClick={() => setShowUserOptions(prev => !prev)}
      >
        Student <CiCircleChevDown className="ml-2 text-xl" />
      </button>
      {showUserOptions && (
        <div className="absolute left-0 mt-2 w-40 shadow-lg rounded-md bg-purple-600">
          <Link
            to="/signin"
            className="block px-4 py-2 text-white font-poppins hover:bg-purple-700 transition-transform hover:text-black transfer hover:scale-95 duration-300"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="block px-4 py-2 text-white font-poppins hover:bg-purple-700 hover:text-black transfer hover:scale-95 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
});

export default Student;
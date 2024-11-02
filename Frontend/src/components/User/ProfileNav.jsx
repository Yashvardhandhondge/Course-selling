import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiBasketballBold } from 'react-icons/pi';

function UserNav() {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/signin'); 
  }, [navigate]);

  return (
    <div className="text-3xl bg-gradient-to-r from-black to-[#2E0249] p-2 flex justify-between bg-purple-600">
      <Link to="/user/landing" className="text-white flex">
        <PiBasketballBold className="text-blue-500 text-5xl p-2" />
        <p className="text-3xl mt-1 font-poppins font-bold text-white">Koursely</p>
      </Link>
      
      <div className="flex items-center space-x-10">
        <Link to="/user/dashboard" className="text-white font-poppins font-semibold text-lg">
          Dashboard
        </Link>
        <Link to="/user/profile" className="text-white font-poppins font-semibold text-lg">
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="bg-purple-400 rounded-2xl px-4 py-2 text-black text-sm font-serif shadow border border-white hover:bg-black hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserNav;

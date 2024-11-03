import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiBookOpen, FiShoppingCart,FiUser } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import { PiBasketballBold } from "react-icons/pi";

const Sidebar = ({ activeSection, setActiveSection, handleLogout }) => (
    <aside className="w-64 bg-black p-4">
        <Link to="/user/landing" className="text-3xl text-white flex font-bold mb-6">
            <PiBasketballBold className="text-blue-500 h-8 w-8 mt-1 mr-4" />
            Koursely
        </Link>
        <nav className="flex flex-col space-y-4">
         <Link to='/user/landing'>   <NavButton title="Available Courses" icon={<FiBookOpen />} active={activeSection === 'availableCourses'} onClick={() => setActiveSection('availableCourses')} /></Link>
         <Link to='/user/purchased'>   <NavButton title="Purchased Courses" icon={<FiShoppingCart />} active={activeSection === 'purchasedCourses'} onClick={() => setActiveSection('purchasedCourses')} /></Link>
        <Link to='/user/wishlist'>    <NavButton title="Wishlist" icon={<AiOutlineHeart />} active={activeSection === 'wishlist'} onClick={() => setActiveSection('wishlist')} /></Link>
          
            <Link to="/user/profile" className={`flex items-center text-white py-2 px-3 rounded  'bg-purple-700' `}> 
          <FiUser className="mr-2" />
          Profile
        </Link>
            
            <button onClick={handleLogout} className="flex items-center text-red-500 py-2 px-3 rounded">
                <FiLogOut className="mr-3" />
                Logout
            </button>
        </nav>
    </aside>
);

const NavButton = ({ title, icon, active, onClick }) => (
    <button 
        className={`flex items-center text-white py-2 px-3 rounded ${active ? 'bg-purple-700' : ''}`} 
        onClick={onClick}
    >
        {icon}
        <span className="ml-3">{title}</span>
    </button>
);

export default Sidebar;
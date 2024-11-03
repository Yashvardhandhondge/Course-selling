import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiBookOpen, FiShoppingCart, FiUser, FiMenu } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import { PiBasketballBold } from "react-icons/pi";

const UserNavbar = ({ activeSection, setActiveSection, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex flex-col h-full bg-black p-4 fixed transition-all duration-300 ease-in-out ${isOpen ? 'w-64 pb-8' : ''}`}>
      <div className="flex items-center justify-between">
       
        <button onClick={toggleMenu} className="md:hidden text-white">
          <FiMenu className="text-3xl" />
        </button>
      </div>

      <nav className={`flex flex-col space-y-4 text-white ${isOpen ? 'block' : 'hidden'} md:block`}>
      <Link to="/user/landing" className="flex items-center text-3xl text-white font-bold mb-6">
          <PiBasketballBold className="text-blue-500 h-8 w-8 mr-2" />
          Koursely
        </Link>
        <NavButton 
          to="/user/landing" 
          icon={FiBookOpen} 
          title="Available Courses" 
          active={activeSection === 'availableCourses'}
          onClick={() => setActiveSection('availableCourses')}
        />
        <NavButton 
          to="/user/purchased" 
          icon={FiShoppingCart} 
          title="Purchased Courses" 
          active={activeSection === 'purchasedCourses'}
          onClick={() => setActiveSection('purchasedCourses')}
        />
        <NavButton 
          to="/user/wishlist" 
          icon={AiOutlineHeart} 
          title="Wishlist" 
          active={activeSection === 'wishlist'}
          onClick={() => setActiveSection('wishlist')}
        />
        <NavButton 
          to="/user/profile" 
          icon={FiUser} 
          title="Profile"
        />
        <button 
          onClick={handleLogout} 
          className="flex items-center text-red-500 hover:text-red-400"
        >
          <FiLogOut className="mr-3" />
          Logout
        </button>
      </nav>
    </div>
  );
};

const NavButton = ({ to, icon: Icon, title, active, onClick }) => (
  <Link 
    to={to}
    onClick={onClick}
    className={`flex items-center text-white hover:text-purple-400 py-2 px-3 rounded ${active ? 'bg-purple-700' : ''}`}
  >
    <Icon className="mr-2" size={20} />
    {title}
  </Link>
);

export default UserNavbar;

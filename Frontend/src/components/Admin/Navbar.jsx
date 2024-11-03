import { PiBasketballBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { adminAPI } from "../../services/adminApi";
import React, { useEffect, useState } from 'react';
import { FiLogOut, FiBookOpen, FiPlusSquare, FiUser, FiMenu } from 'react-icons/fi'; // Importing user icon

const AdminNavbar = React.memo(() => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await adminAPI.getAdmin(token);
          setProfile(response.data.admin);
          console.log(response.data.admin);
        } catch (e) {
          console.error('Failed to fetch profile:', e);
        }
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/admin/signin');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const NavButton = ({ icon: Icon, children, onClick }) => (
    <button 
      onClick={onClick}
      className="flex items-center hover:text-purple-400 p-2 w-full"
    >
      <Icon className="mr-2" size={20} />
      <span>{children}</span>
    </button>
  );

  return (
    <div className={`flex flex-col h-full w-64 bg-black p-4 font-poppins fixed transition-all duration-300 ease-in-out ${isOpen ? 'pb-8' : ''}`}>
      <div className="flex items-">

        <button onClick={toggleMenu} className="md:hidden ml-auto text-white">
          <FiMenu className="text-3xl" />
        </button>
      </div>
      
   
      <Link to='/admin/landing' className={`flex items-center mb-4 ${isOpen ? 'block' : 'hidden'} md:flex`}>
        <PiBasketballBold className='text-blue-500 text-5xl p-2' />
        <p className="text-3xl mt-1 text-white">Koursely</p> 
      </Link>
    
      <nav className={`flex flex-col space-y-4 text-white ${isOpen ? 'block' : 'hidden'} md:block`}>
        <Link to="/admin/create" className="flex items-center hover:text-purple-400">
          <FiPlusSquare className="mr-2" />
          Create Course
        </Link>
        <Link to="/admin/courses" className="flex items-center hover:text-purple-400">
          <FiBookOpen className="mr-2" />
          Created Courses
        </Link>
        <Link to="/admin/profile" className="flex items-center hover:text-purple-400"> 
          <FiUser className="mr-2" />
          Profile
        </Link>
        <button 
          onClick={handleLogout} 
          className="flex items-center hover:text-purple-400"
        >
          <FiLogOut className="mr-2" /> Logout
        </button>
      </nav>

      <div className="flex-grow"></div> {/* This will push the profile icon and logout button to the bottom */}
      
      <div className="mt-auto flex flex-col items-center">
      </div>
    </div>
  );
});

export default AdminNavbar;

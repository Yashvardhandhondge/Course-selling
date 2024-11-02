import { PiBasketballBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { adminAPI } from "../../services/adminApi";
import React, { useEffect, useState } from 'react';

const Navbar = React.memo(() => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

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

  return (
    <div className="font-poppins">
      <div className="text-3xl flex justify-between">
        <div>
          <Link to='/admin/landing' className="flex">
            <PiBasketballBold className='text-blue-500 text-5xl p-2' />
            <p className="text-3xl mt-1 text-white">Koursely</p>
          </Link>
        </div>

        <div className="text-white ml-[300px]">Admin Panel</div>
        <div className="ml-[300px] space-x-4">
          {profile && (
            <div className="flex">
              <Link to="/admin/profile">
                <div className="flex cursor-pointer">
                  <img
                    src={profile.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-white">{profile.firstname}</span>
                </div>
              </Link>
              <button 
                onClick={handleLogout} 
                className="bg-blue-400 text-sm text-black ml-[100px] shadow bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 rounded-2xl hover:scale-90 hover:bg-black hover:text-white border border-solid font-poppins"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Navbar;

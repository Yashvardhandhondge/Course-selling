import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiBasketballBold } from "react-icons/pi";

const ProfileNav = React.memo(() => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/signup');
    };

    return (
        <div>
            <div className="text-3xl p-2 flex justify-between">
                <Link to='/admin/landing' className='text-white flex'>
                    <PiBasketballBold className='text-blue-500 text-5xl p-2' />
                    <p className="text-3xl mt-1 font-poppins font-bold text-white">Koursely</p>
                </Link>
                
                <div className="text-white flex mt-1 ml-[470px] font-poppins font-semibold mr-24">
                    <p>Profile</p>
                </div>
                
                <button 
                    onClick={handleLogout} 
                    className="bg-purple-400 rounded-2xl mr-8 flex justify-end h-12 items-end font-poppins text-sm text-black ml-[400px] shadow border-white px-4 py-3 hover:bg-black hover:text-white border border-solid"
                >
                    Logout
                </button>
            </div>
        </div>
    );
});

export default ProfileNav;

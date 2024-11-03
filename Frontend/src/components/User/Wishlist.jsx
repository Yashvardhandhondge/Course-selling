import React, { useCallback, useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import Search from './Search';
import Profileshortcut from './Profile';
import Sidebar from './Sliderbar';
import { useNavigate } from 'react-router-dom';
import { wishlistAPI } from '../../services/wishlistAPI';

const Wishlist = ({ searchTerm, onUpdateWishlist }) => {
    const [wishlist, setWishlist] = useState([]);
    const [activeSection, setActiveSection] = useState('wishlist');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const fetchWishlist = useCallback(async () => {
        try {
            const response = await wishlistAPI.getWishlist(userId, token);
            setWishlist(response.data.wishlist.courses);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    }, [userId, token]);
    
    useEffect(() => {
        fetchWishlist();
    },[fetchWishlist])

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
    }, [navigate]);

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-black to-[#2E0249] ">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} handleLogout={handleLogout} />
            <div className="flex-1 p-4">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold text-white mb-6">My Courses</h2>
                    <Search />
                    <Profileshortcut />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.map(course => (
                                <CourseCard key={course._id} course={course} wishlist={wishlist} onUpdateWishlist={fetchWishlist} />
                            ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;

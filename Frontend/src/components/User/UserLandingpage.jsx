import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseAPI } from '../../services/courseAPI';
import { wishlistAPI } from '../../services/wishlistAPI';
import Sidebar from './Sliderbar';
import AvailableCourses from './AvailableCourses';
import PurchasedCourses from './PurchasedCourses';
import Wishlist from './Wishlist';

const UserLandingPage = () => {
    const [courses, setCourses] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSection, setActiveSection] = useState('availableCourses');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const fetchCourses = useCallback(async () => {
        try {
            const response = await courseAPI.getAllCourses(token);
            setCourses(response.data.courses);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }, [token]);

  
    const fetchWishlist = useCallback(async () => {
        try {
            const response = await wishlistAPI.getWishlist(userId, token);
            setWishlist(response.data.wishlist.courses);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    }, [userId, token]);

    const handleSearch = (term) => setSearchTerm(term);

  
    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
    }, [navigate]);


    useEffect(() => {
        fetchCourses();
        fetchWishlist();
    }, [fetchCourses, fetchWishlist]);

    const renderContent = () => {
        switch (activeSection) {
            case 'availableCourses':
                return (
                    <AvailableCourses
                        courses={courses}
                        searchTerm={searchTerm}
                        wishlist={wishlist}
                        onUpdateWishlist={fetchWishlist}
                    />
                );
            case 'purchasedCourses':
                return <PurchasedCourses />;
            case 'wishlist':
                return <Wishlist wishlist={wishlist} onUpdateWishlist={fetchWishlist} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-black to-[#2E0249]">
            <Sidebar 
                activeSection={activeSection} 
                setActiveSection={setActiveSection} 
                handleLogout={handleLogout} 
            />
            <main className="flex-1 p-6 font-poppins">
                {renderContent()}
            </main>
        </div>
    );
};

export default UserLandingPage;

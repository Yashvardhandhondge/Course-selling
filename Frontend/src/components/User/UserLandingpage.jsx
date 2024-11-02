import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { courseAPI } from '../../services/courseAPI';
import { wishlistAPI } from '../../services/wishlistAPI';
import { analyticsAPI } from '../../services/Analytics';
import CourseCard from './CourseCard';
import Search from './Search';
import debounce from 'lodash.debounce';
import MyCoursesPage from './AvailableCurse';
import { AiOutlineHeart } from 'react-icons/ai';
import Profileshortcut from './Profile';
import { Link, useNavigate } from 'react-router-dom';
import { PiBasketballBold } from "react-icons/pi";
import { FiLogOut, FiBookOpen, FiShoppingCart } from 'react-icons/fi';

const UserLandingPage = () => {
    const [courses, setCourses] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [mostViewedCourses, setMostViewedCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSection, setActiveSection] = useState('availableCourses');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [userData, setUserData] = useState({ firstname: '', image: '' });
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

    const fetchRecommendations = useCallback(async () => {
        try {
            const response = await wishlistAPI.getRecommendations(userId, token);
            setRecommendations(response.data.recommendations);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    }, [userId, token]);

    const fetchMostViewedCourses = useCallback(async () => {
        try {
            const response = await analyticsAPI.getMostViewedCourses(token);
            setMostViewedCourses(response.data.mostViewedCourses);
        } catch (error) {
            console.error("Error fetching most viewed courses:", error);
        }
    }, [token]);

    useEffect(() => {
        fetchCourses();
        fetchWishlist();
        fetchRecommendations();
        fetchMostViewedCourses();
    }, [fetchCourses, fetchWishlist, fetchRecommendations, fetchMostViewedCourses]);

    const handleSearch = useCallback((term) => setSearchTerm(term), []);
    const debouncedSearch = useMemo(() => debounce(handleSearch, 300), [handleSearch]);

    const filteredCourses = useMemo(
        () => courses.filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase())),
        [courses, searchTerm]
    );

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
    }, [navigate]);

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-black to-[#2E0249]">
            <Sidebar 
                activeSection={activeSection} 
                setActiveSection={setActiveSection} 
                userData={userData} 
                handleLogout={handleLogout} 
            />
            <main className="flex-1 p-6 font-poppins"> {/* Add the font class here */}
                {activeSection === 'availableCourses' && (
                    <>
                    <div className='flex justify-between'>
                        <h2 className="text-2xl font-bold text-white mb-4 mr-8">Available Courses</h2>
                        <Search onSearch={debouncedSearch} />
                        <Profileshortcut />
                    </div>
                        <div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredCourses.map(course => (
                                <CourseCard key={course._id} course={course} wishlist={wishlist} onUpdateWishlist={fetchWishlist} />
                            ))}
                        </div>
                    </>
                )}
                
                {activeSection === 'purchasedCourses' && (
                    <MyCoursesPage />
                )}
                
                {activeSection === 'wishlist' && (
                    <>
                        <div className='flex justify-between'>
                        <h2 className="text-2xl font-bold text-white mb-4">Wishlist</h2>
                        <Search onSearch={debouncedSearch} />
                        <Profileshortcut />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {wishlist.map(course => (
                                <CourseCard key={course._id} course={course} wishlist={wishlist} onUpdateWishlist={fetchWishlist} />
                            ))}
                        </div>
                    </>
                )}
                
                {activeSection === 'recommendations' && (
                    <>
                     <div className='flex justify-between'>
                        <h2 className="text-2xl font-bold text-white mb-4">Recommended Courses</h2>
                        <Search onSearch={debouncedSearch} />
                        <Profileshortcut />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recommendations.map(course => (
                                <CourseCard key={course._id} course={course} onUpdateWishlist={fetchWishlist} />
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

const Sidebar = React.memo(({ activeSection, setActiveSection, userData, handleLogout }) => (
    <aside className="w-64 bg-gray-800 p-4">
        <Link to="/" className="text-3xl text-white flex font-bold mb-6">
            <PiBasketballBold className="text-blue-500 h-8 w-8 mt-1 mr-4" />
            Koursely
        </Link>
        <nav className="flex flex-col space-y-4">
            <NavButton title="Available Courses" icon={<FiBookOpen />} active={activeSection === 'availableCourses'} onClick={() => setActiveSection('availableCourses')} />
            <NavButton title="Purchased Courses" icon={<FiShoppingCart />} active={activeSection === 'purchasedCourses'} onClick={() => setActiveSection('purchasedCourses')} />
            <NavButton title="Wishlist" icon={<AiOutlineHeart />} active={activeSection === 'wishlist'} onClick={() => setActiveSection('wishlist')} />
            <button onClick={handleLogout} className="flex items-center text-red-500 py-2 px-3 rounded">
                <FiLogOut className="mr-3" />
                Logout
            </button>
        </nav>
    </aside>
));

const NavButton = React.memo(({ title, icon, active, onClick }) => (
    <button 
        className={`flex items-center text-white py-2 px-3 rounded ${active ? 'bg-purple-700' : ''}`} 
        onClick={onClick}
    >
        {icon}
        <span className="ml-3">{title}</span>
    </button>
));

export default UserLandingPage;

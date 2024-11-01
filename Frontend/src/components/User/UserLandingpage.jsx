import React, { useState, useEffect } from 'react';
import { courseAPI } from '../../services/courseAPI';
import { wishlistAPI } from '../../services/wishlistAPI';
import { analyticsAPI } from '../../services/Analytics';// Import the analytics API
import CourseCard from './CourseCard';
import Search from './Search';
import debounce from 'lodash.debounce';
import MyCoursesPage from './AvailableCurse';
import { AiOutlineHeart } from 'react-icons/ai';
import { userAPI } from '../../services/userAPI';
import { Link } from 'react-router-dom';
const UserLandingPage = () => {
    const [courses, setCourses] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [mostViewedCourses, setMostViewedCourses] = useState([]); // State for most viewed courses
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [showWishlist, setShowWishlist] = useState(false);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const[userData,setUserData] = useState({firstname:'',image:""})
    useEffect(() => {
        fetchCourses();
        fetchWishlist();
        fetchRecommendations();
        fetchMostViewedCourses(); 
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await userAPI.fetchProfile(token);
                setUserData(response.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
        
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await courseAPI.getAllCourses(token);
            setCourses(response.data.courses);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching courses:", error);
            setLoading(false);
        }
    };

    const fetchWishlist = async () => {
        try {
            const response = await wishlistAPI.getWishlist(userId, token);
            setWishlist(response.data.wishlist.courses);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    const fetchRecommendations = async () => {
        try {
            const response = await wishlistAPI.getRecommendations(userId, token);
            setRecommendations(response.data.recommendations);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };

    const fetchMostViewedCourses = async () => {
        try {
            const response = await analyticsAPI.getMostViewedCourses(token);
            setMostViewedCourses(response.data.mostViewedCourses); // Set the most viewed courses
        } catch (error) {
            console.error("Error fetching most viewed courses:", error);
        }
    };

    const handleSearch = (term) => setSearchTerm(term);
    const debouncedSearch = debounce(handleSearch, 300);
    const filteredCourses = courses.filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const toggleWishlist = () => setShowWishlist(!showWishlist);
    const handleWishlistUpdate = () => fetchWishlist();

    return (
        <div className="container mx-auto p-4">
            <header>
                <Link to="/user/profile" className="profile-link">
                    {userData.image && (
                        <img src={userData.image} alt="User Avatar" className="profile-image" />
                    )}
                    <span>{userData.firstname}</span>
                </Link>
            </header>
            <div className="bg-gray-100 p-4 rounded mb-4">
                <h2 className="text-xl font-bold mb-2">Most Viewed Courses</h2>
                <ul>
                    {mostViewedCourses.length > 0 ? (
                        mostViewedCourses.map(course => (
                            <li key={course._id} className="border-b py-2">{course._id} - {course.count} views</li>
                        ))
                    ) : (
                        <li>No data available</li>
                    )}
                </ul>
            </div>

            {/* Courses Section */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Courses</h1>
                <button onClick={toggleWishlist} className="text-red-500 text-2xl">
                    <AiOutlineHeart />
                </button>
            </div>

            <Search onSearch={debouncedSearch} />
            
            {showWishlist && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg p-4 z-10">
                    <h2 className="font-semibold text-lg mb-2">My Wishlist</h2>
                    {wishlist.length > 0 ? (
                        wishlist.map(course => (
                            <div key={course._id} className="flex justify-between items-center mb-2">
                                <p>{course.title}</p>
                                <button
                                    onClick={() => wishlistAPI.deleteFromWishlist({ courseId: course._id }, token).then(fetchWishlist)}
                                    className="text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No courses in wishlist</p>
                    )}
                </div>
            )}

            <div>
                <p>Purchased Courses</p>
                <MyCoursesPage />
                
                <h2 className="text-xl font-bold mt-6 mb-2">Available Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCourses.map(course => (
                        <CourseCard key={course._id} course={course} onUpdateWishlist={handleWishlistUpdate} />
                    ))}
                </div>
                
                <h2 className="text-xl font-bold mt-6 mb-2">Recommended Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendations.map(course => (
                        <CourseCard key={course._id} course={course} onUpdateWishlist={handleWishlistUpdate} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserLandingPage;

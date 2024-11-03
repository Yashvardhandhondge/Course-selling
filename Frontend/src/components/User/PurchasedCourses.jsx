import React, { useState, useEffect, useCallback } from 'react';
import { courseAPI } from '../../services/courseAPI';
import ExploreCourseCard from './ExploreCourse';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sliderbar';
import Search from './Search';
import Profileshortcut from './Profile';

const PurchasedCourses = () => {
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchMyCourses = useCallback(async () => {
        try {
            const response = await courseAPI.getMyCourses(token);
            console.log("API response for purchased courses:", response.data); // Log the response data
            
            // Check if response data contains the expected structure
            if (response.data && response.data.courses) {
                setPurchasedCourses(response.data.courses);
            } else {
                setPurchasedCourses([]); // Set an empty array if no courses found
            }
        } catch (error) {
            console.error("Error fetching my courses:", error);
            setPurchasedCourses([]); // Set an empty array in case of error
        }
    }, [token]);

    useEffect(() => {
        fetchMyCourses();
    }, [fetchMyCourses]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
    }, [navigate]);

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-black to-[#2E0249] ">
            <Sidebar handleLogout={handleLogout} />
            <div className="flex-1 p-4 ml-12 lg:ml-64">
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-bold text-white mb-6 hidden sm:hidden lg:inline-block">My Courses</h2>
                    <Search />
                    <Profileshortcut />
                </div>
                {purchasedCourses.length === 0 ? (
                    <p className="text-white">You haven't purchased or enrolled in any courses yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {purchasedCourses.map(course => (
                            <ExploreCourseCard key={course._id} course={course} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchasedCourses;

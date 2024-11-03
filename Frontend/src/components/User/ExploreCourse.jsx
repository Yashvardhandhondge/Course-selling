import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ExploreCourseCard = ({ course }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleExploreClick = useCallback(() => {
        navigate('/user/course', { state: { course, token } }); 
    }, [course, navigate, token]);

    return (
        <div className="bg-purple-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h2 className="text-2xl font-poppins text-white font-bold mb-2">{course.title}</h2>
                <p className="mb-4 font-poppins text-white">{course.description}</p>
                <p className="text-lg font-poppins font-semibold text-white mb-4">${course.price}</p>
                <button
                    onClick={handleExploreClick}
                    className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-black px-4 py-2 rounded hover:bg-purple-600 transition-colors duration-200"
                >
                    Explore Course
                </button>
            </div>
        </div>
    );
};

export default ExploreCourseCard;
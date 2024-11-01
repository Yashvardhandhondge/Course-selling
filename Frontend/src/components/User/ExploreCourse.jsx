import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExploreCourseCard = ({ course }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleExploreClick = () => {
        navigate('/user/course', { state: { course, token } }); // Navigate to course details page
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-700 mb-4">{course.description}</p>
                <p className="text-lg font-semibold text-blue-600 mb-4">${course.price}</p>
                <button
                    onClick={handleExploreClick}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors duration-200"
                >
                    Explore Course
                </button>
            </div>
        </div>
    );
};

export default ExploreCourseCard;

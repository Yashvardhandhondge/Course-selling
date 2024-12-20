import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseAPI } from '../../services/courseAPI';

const CourseCard2 = ({ course }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handlePurchaseClick = useCallback(async () => {
        const response = await courseAPI.checkEnrollment(course._id, token);
        
        if (response.data.enrollment) {
            navigate(`/course/${course._id}`);
        } else {
            navigate('/payment', { state: { course, token } });
        }
    }, [course._id, navigate, token]);

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out font-poppins">
            <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-700 mb-4">{course.description}</p>
                <p className="text-lg font-semibold text-blue-600 mb-4">${course.price}</p>
                <button
                    onClick={handlePurchaseClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
                >
                    
                    {course.enrollment ? 'View Course' : 'Purchase Course'}
                </button>
            </div>
        </div>
    );
};

export default CourseCard2;

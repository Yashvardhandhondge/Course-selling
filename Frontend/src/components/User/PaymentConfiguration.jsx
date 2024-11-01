import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { courseAPI } from '../../services/courseAPI'; // Adjust the path as needed

const PaymentConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Use useLocation to access state

    const { course, token } = location.state || {}; // Destructure course and token

    // Check if course data is available
    if (!course) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>No course information available.</p>
            </div>
        );
    }

    const confirmPurchase = async () => {
        try {
            const data = {
                courseId: course._id, // Accessing the course ID
                paymentMethod: 'mock',  
                amount: course.price,
            };

            const response = await courseAPI.purchaseCourse(data, token);

            if (response.data.message) {
                alert(response.data.message); 
                navigate('/user/landing'); 
            }
        } catch (error) {
            console.error('Purchase failed:', error);
            alert('An error occurred during the purchase.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Confirm Payment</h2>
                <p>Are you sure you want to purchase the course: <strong>{course.title}</strong> for <strong>${course.price}</strong>?</p>
                
                <button
                    onClick={confirmPurchase}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition-colors duration-200"
                >
                    Yes
                </button>
                <button
                    onClick={() => navigate('/user/landing')}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
                >
                    No
                </button>
            </div>
        </div>
    );
};

export default PaymentConfirmation;

import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { courseAPI } from '../../services/courseAPI'; 

const PaymentConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation(); 

    const { course, token } = location.state || {}; 

    if (!course) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>No course information available.</p>
            </div>
        );
    }

    const confirmPurchase = useCallback(async () => {
        try {
            const data = {
                courseId: course._id, 
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
    }, [course, navigate, token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#2E0249]">
            <div className="bg-[#2E0249] p-6 rounded shadow-md max-w-md w-full">
                <h2 className="text-2xl text-white font-poppins font-bold mb-4">Confirm Payment</h2>
                <p className='text-white font-poppins'>
                    Are you sure you want to purchase the course: <strong>{course.title}</strong> for <strong>${course.price}</strong>?
                </p>
                <button
                    onClick={confirmPurchase}
                    className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-black px-4 py-2 rounded mr-2 hover:scale-95 transition-colors duration-200"
                >
                    Yes
                </button>
                <button
                    onClick={() => navigate('/user/landing')}
                    className="bg-gradient-to-r from-red-500 to-red-500 text-black hover:scale-95 px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
                >
                    No
                </button>
            </div>
        </div>
    );
};

export default PaymentConfirmation;

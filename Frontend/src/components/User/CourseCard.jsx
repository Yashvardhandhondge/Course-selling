import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { wishlistAPI } from '../../services/wishlistAPI'; // Import wishlist API
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const CourseCard = ({ course, onUpdateWishlist }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handlePurchaseClick = () => {
        navigate('/payment', { state: { course, token } });
    };

    const handleWishlistClick = async () => {
        try {
            if (isWishlisted) {
                await wishlistAPI.deleteFromWishlist({ courseId: course._id }, token);
                onUpdateWishlist(); // Refresh wishlist
            } else {
                await wishlistAPI.addToWishlist({ courseId: course._id }, token);
                onUpdateWishlist(); // Refresh wishlist
            }
            setIsWishlisted(!isWishlisted);
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-700 mb-4">{course.description}</p>
                <p className="text-lg font-semibold text-blue-600 mb-4">${course.price}</p>
                <button
                    onClick={handlePurchaseClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
                >
                    Purchase Course
                </button>
                <button onClick={handleWishlistClick} className="ml-4 text-red-500">
                    {isWishlisted ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
                </button>
            </div>
        </div>
    );
};

export default CourseCard;

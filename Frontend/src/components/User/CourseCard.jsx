import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { wishlistAPI } from '../../services/wishlistAPI';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const CourseCard = React.memo(({ course, wishlist=[], onUpdateWishlist }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [isWishlisted, setIsWishlisted] = useState(
        wishlist.some(wishlistedCourse => wishlistedCourse._id === course._id)
    );

    const handlePurchaseClick = () => {
        navigate('/payment', { state: { course, token } });
    };

    const handleWishlistClick = async () => {
        try {
            if (isWishlisted) {
                await wishlistAPI.deleteFromWishlist({ courseId: course._id }, token);
            } else {
                await wishlistAPI.addToWishlist({ courseId: course._id }, token);
            }
            onUpdateWishlist();
            setIsWishlisted(!isWishlisted); 
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    };

    return (
        <div className="border border-solid bg-purple-700 border-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h2 className="text-2xl text-white font-bold font-poppins mb-2">{course.title}</h2>
                <p className="text-white font-poppins mb-4">{course.description}</p>
                <p className="text-lg font-semibold text-white mb-4">${course.price}</p>
                <button
                    onClick={handlePurchaseClick}
                    className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:scale-95 text-black px-4 py-2 rounded hover:bg-blue- transition-colors duration-200"
                >
                    Purchase Course
                </button>
                <button onClick={handleWishlistClick} className="ml-4 text-red-300">
                    {isWishlisted ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
                </button>
            </div>
        </div>
    );
});

export default CourseCard;

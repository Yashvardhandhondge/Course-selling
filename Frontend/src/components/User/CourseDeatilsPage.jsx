import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { enrollmentAPI } from '../../services/enrollmentAPI';
import { reviewAPI } from '../../services/reviewAPI';

const CourseDetailsPage = () => {
    const { state } = useLocation();
    const { course } = state || {}; // Access course data from navigation state
    const [progress, setProgress] = useState(0);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [isCourseComplete, setIsCourseComplete] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!course) {
            navigate('/courses'); // Redirect if no course data is available
            return;
        }
        fetchProgress();
        fetchReviews();
    }, [course]);

    const fetchProgress = async () => {
        try {
            const response = await enrollmentAPI.getProgress({ courseId: course._id }, token);
            setProgress(response.data.progress);
            setCompletedLessons(response.data.lessonsCompleted);
            setIsCourseComplete(response.data.progress === 100);
        } catch (error) {
            console.error("Error fetching progress:", error);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await reviewAPI.getCourseReviews(course._id);
            setReviews(response.data.review);
            const avgRating = response.data.review.reduce((acc, review) => acc + review.rating, 0) / response.data.review.length || 0; // Added a fallback to avoid NaN
            setAverageRating(avgRating);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleUpdateProgress = async (lessonId) => {
        if (completedLessons.includes(lessonId)) return; // Skip if already completed

        try {
            const response = await enrollmentAPI.updateProgress({ courseId: course._id, lessonId }, token);
            setCompletedLessons([...completedLessons, lessonId]);
            setProgress(response.data.progress);
        } catch (error) {
            console.error("Error updating progress:", error);
        }
    };

    const handleCompleteCourse = async () => {
        try {
            const response = await enrollmentAPI.completeCourse({ courseId: course._id }, token);
            setProgress(100);
            setIsCourseComplete(true);
        } catch (error) {
            console.error("Error completing course:", error);
        }
    };

    const handleAddReview = async () => {
        if (!rating || !comment) {
            alert("Please provide a rating and a comment");
            return;
        }

        try {
            const response = await reviewAPI.addReview({ courseId: course._id, rating, comment }, token);
            alert(response.data.message);
            setRating(0);
            setComment('');
            fetchReviews(); // Refresh reviews after adding a new one
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-gray-700 mb-4">{course.description}</p>
            <div className="text-lg font-semibold mb-4">Progress: {progress}%</div>

            {course.lessons.map((lesson, index) => (
                <div key={lesson._id} className="flex items-center mb-2">
                    <p className="flex-grow">{lesson.title}</p>
                    <button
                        onClick={() => handleUpdateProgress(lesson._id)}
                        disabled={completedLessons.includes(lesson._id)}
                        className={`px-4 py-2 rounded ${completedLessons.includes(lesson._id) ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                    >
                        {completedLessons.includes(lesson._id) ? 'Completed' : 'Mark Complete'}
                    </button>
                </div>
            ))}

            {isCourseComplete ? (
                <p className="text-green-600 font-bold">Course Completed</p>
            ) : (
                <button
                    onClick={handleCompleteCourse}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200 mt-4"
                >
                    Complete Course
                </button>
            )}

            {/* Display Reviews */}
            <h2 className="text-2xl font-bold mt-8">Course Reviews</h2>
            <p className="text-lg font-semibold mb-4">Average Rating: {averageRating.toFixed(1)}/5</p>
            <ul>
                {reviews.map((review) => (
                    <li key={review._id} className="border-b border-gray-300 py-4">
                        <p className="text-lg font-semibold">
                            {review.userId ? `${review.userId.firstname} ${review.userId.lastname}` : 'Anonymous'} {/* Fallback for userId */}
                        </p>
                        <p>Rating: {review.rating} ★</p>
                        <p>{review.comment}</p>
                    </li>
                ))}
            </ul>

            {/* Add a New Review */}
            <h2 className="text-2xl font-bold mt-8">Add a Review</h2>
            <div className="flex items-center mb-4">
                <p className="mr-4">Your Rating:</p>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => setRating(star)}
                        className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                    >
                        ★
                    </span>
                ))}
            </div>
            <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Write a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button
                onClick={handleAddReview}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
            >
                Submit Review
            </button>
        </div>
    );
};

export default CourseDetailsPage;

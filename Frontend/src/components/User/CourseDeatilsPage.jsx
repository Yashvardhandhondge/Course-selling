import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { enrollmentAPI } from '../../services/enrollmentAPI';
import { reviewAPI } from '../../services/reviewAPI';
import { PiBasketballBold } from "react-icons/pi";
import Profileshortcut from './Profile';
import { Link } from 'react-router-dom';
import Chatbot from '../Home/Chatbot';
import Sidebar from './Sliderbar';

const CourseDetailsPage = React.memo(() => {
    const { state } = useLocation();
    const { course } = state || {};
    const [progress, setProgress] = useState(0);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [isCourseComplete, setIsCourseComplete] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [activeVideo, setActiveVideo] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('availableCourses');
    useEffect(() => {
        if (!course) {
            navigate('/courses');
            return;
        }
        fetchProgress();
        fetchReviews();
    }, [course, navigate]);

    const fetchProgress = useCallback(async () => {
        try {
            const response = await enrollmentAPI.getProgress({ courseId: course._id }, token);
            setProgress(response.data.progress);
            setCompletedLessons(response.data.lessonsCompleted);
            setIsCourseComplete(response.data.progress === 100);
        } catch (error) {
            console.error("Error fetching progress:", error);
        }
    }, [course, token]);

    const fetchReviews = useCallback(async () => {
        try {
            const response = await reviewAPI.getCourseReviews(course._id);
            setReviews(response.data.review);
            const avgRating = response.data.review.reduce((acc, review) => acc + review.rating, 0) / response.data.review.length || 0;
            setAverageRating(avgRating);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }, [course._id]);

    const handleUpdateProgress = useCallback(async (lessonId) => {
        if (completedLessons.includes(lessonId)) return;

        try {
            const response = await enrollmentAPI.updateProgress({ courseId: course._id, lessonId }, token);
            setCompletedLessons(prev => [...prev, lessonId]);
            setProgress(response.data.progress);
        } catch (error) {
            console.error("Error updating progress:", error);
        }
    }, [completedLessons, course._id, token]);

    const handleAddReview = useCallback(async () => {
        if (!rating || !comment) {
            alert("Please provide a rating and a comment");
            return;
        }

        try {
            const response = await reviewAPI.addReview({ courseId: course._id, rating, comment }, token);
            alert(response.data.message);
            setRating(0);
            setComment('');
            fetchReviews();
        } catch (error) {
            console.error("Error adding review:", error);
            setRating(0);
            setComment('');
        }
    }, [rating, comment, course._id, token, fetchReviews]);

    const getYoutubeEmbedUrl = (url) => {
        const videoId = new URL(url).searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
    };

    const handleWatchVideo = (lessonId) => {
        setActiveVideo(lessonId === activeVideo ? null : lessonId);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login'); 
    };
    return (
        <div className="flex min-h-screen bg-gradient-to-r from-black to-[#2E0249]  ">
            <Sidebar handleLogout={handleLogout} />
     
            <div className="flex-grow p-4 sm:p-6 md:p-8 text-white font-poppins ml-12 lg:ml-64">
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <h1 className="text-4xl font-bold mb-6 text-center">{course?.title}</h1>
                    <Profileshortcut />
                </div>
    
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {course?.lessons.map((lesson) => (
                        <div key={lesson._id} className="bg-purple-700 p-4 rounded-lg shadow-lg">
                            {activeVideo === lesson._id ? (
                                <iframe
                                    width="100%"
                                    height="250"
                                    src={getYoutubeEmbedUrl(lesson.videoUrl)}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-lg mb-4"
                                ></iframe>
                            ) : (
                                <img
                                    src={`https://img.youtube.com/vi/${new URL(lesson.videoUrl).searchParams.get("v")}/hqdefault.jpg`}
                                    alt="Lesson Thumbnail"
                                    className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
                                    onClick={() => handleWatchVideo(lesson._id)}
                                />
                            )}
                            <h2 className="text-2xl font-semibold mb-2">{lesson.title}</h2>
                            <p className="mb-4 text-gray-300">{lesson.content}</p>
                            <button
                                onClick={() => handleWatchVideo(lesson._id)}
                                className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:opacity-90 transition-opacity duration-200"
                            >
                                {activeVideo === lesson._id ? 'Hide Video' : 'Watch Video'}
                            </button>
                            <button
                                onClick={() => handleUpdateProgress(lesson._id)}
                                disabled={completedLessons.includes(lesson._id)}
                                className={`w-full mt-2 py-2 rounded-lg text-white font-semibold ${
                                    completedLessons.includes(lesson._id)
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 transition-opacity duration-200'
                                }`}
                            >
                                {completedLessons.includes(lesson._id) ? 'Completed' : 'Mark Complete'}
                            </button>
                        </div>
                    ))}
                </div>
    
                {isCourseComplete && (
                    <div className="mt-8 text-center text-green-400 font-bold text-2xl">
                        Congratulations! You've completed this course.
                    </div>
                )}
    
                <h2 className="text-3xl font-bold mt-12 mb-4">Course Reviews</h2>
                <p className="text-xl mb-8">Average Rating: {averageRating.toFixed(1)}/5</p>
                <div className="flex mb-8 flex-col md:flex-row">
                    <div className="w-full md:w-2/3 lg:w-1/2">
                        {reviews.map((review) => (
                            <div key={review._id} className="mb-6 bg-purple-800 p-4 rounded-lg shadow-lg">
                                <p className="text-lg font-semibold">
                                    {review.userId ? `${review.userId.firstname} ${review.userId.lastname}` : 'Anonymous'}
                                </p>
                                <p className="text-yellow-500">Rating: {review.rating} ★</p>
                                <p className="text-gray-300">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
    
                <div className="mt-8">
                    <h2 className="text-3xl font-bold mb-4">Add a Review</h2>
                    <div className="flex items-center mb-4 flex-col sm:flex-row">
                        <p className="mr-4 text-xl">Your Rating:</p>
                        <div className="flex mb-4 mt-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`cursor-pointer text-3xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center gap-2 mb-4'>
                        <textarea
                            className="w-full md:w-1/2 lg:w-1/3 p-2 border border-gray-400 rounded"
                            rows="4"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your comment here..."
                        />
                        <button
                            onClick={handleAddReview}
                            className="px-4 py-2 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <Chatbot />
            </div>
        </div>
    );
    
});

export default CourseDetailsPage;

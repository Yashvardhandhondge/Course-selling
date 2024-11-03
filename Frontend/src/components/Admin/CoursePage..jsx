import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { adminAPI } from "../../services/adminApi";
import Fetchadmin from "./FetchAdmin";
import AdminNavbar from "./Navbar";
import Chatbot from "../Home/Chatbot";
export default function CourseDetails() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [playingVideoId, setPlayingVideoId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await adminAPI.getCoursesId(courseId, token);
                    setCourse(response.data.course);
                } catch (e) {
                    console.error("Failed to fetch course:", e);
                }
            } else {
                console.error("No token provided");
            }
        };
        fetchCourse();
    }, [courseId]);

    const handleDelete = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await adminAPI.deleteCourse(courseId, { courseId }, token);
                if (response.status === 200) {
                    alert(response.data.message);
                    navigate("/admin/landing");
                } else {
                    alert("Failed to delete course");
                }
            } else {
                alert("Token not available");
            }
        } catch (e) {
            console.error("Error deleting course:", e);
        }
    }, [courseId, navigate]);

    const getVideoId = useCallback((videoUrl) => {
        return videoUrl.split("v=")[1]?.split("&")[0];
    }, []);

    const handleThumbnailClick = useCallback((videoUrl) => {
        const videoId = getVideoId(videoUrl);
        setPlayingVideoId((prev) => (prev === videoId ? null : videoId)); 
    }, [getVideoId]);

    if (!course) return <p className="text-white font-poppins">Loading...</p>;

    return (
        <div className="flex text-purple-700">
            <AdminNavbar/>
            <div className="flex-grow min-h-screen bg-black p-4 font-poppins ml-12 lg:ml-64">
            <div className="flex justify-end items-center  mb-4">
            <Fetchadmin/>
            </div>
            <div className="flex">
                <img src={course.imageUrl} alt={course.title} className="w-52 h-72 rounded-2xl mb-4" />
                <div className="ml-5">
                    <h2 className="text-3xl  font-bold mb-2">{course.title}</h2>
                    <p className="mt-2">Price: {course.price}</p>
                    <p className="mt-4">{course.description}</p>
                    <p className="text-sm mt-2">Category: {course.category}</p>
                    <p className="text-sm mt-2">Difficulty: {course.difficulty}</p>
                </div>
            </div>
            {course.lessons && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Lessons</h3>
                    <ul className="flex flex-wrap gap-6">
                        {course.lessons.map((lesson, index) => {
                            const videoId = getVideoId(lesson.videoUrl);
                            return (
                                <li key={index} className="w-[300px] p-4 rounded-lg">
                                    <h4 className="text-lg font-bold">{lesson.title}</h4>
                                    <p className="mt-1">{lesson.content || "No content available"}</p>
                                    {lesson.videoUrl && (
                                        <div className="mt-2">
                                            {playingVideoId === videoId ? (
                                                <iframe
                                                    width="100%"
                                                    height="180"
                                                    src={`https://www.youtube.com/embed/${videoId}`}
                                                    title={`${lesson.title} video player`}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    className="w-full rounded"
                                                ></iframe>
                                            ) : (
                                                <img
                                                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                                    alt={`${lesson.title} thumbnail`}
                                                    className="w-full h-28 rounded cursor-pointer"
                                                    onClick={() => handleThumbnailClick(lesson.videoUrl)}
                                                />
                                            )}
                                        </div>
                                    )}
                                    <p className="mt-1">Duration: {lesson.duration || "N/A"}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
            <div className="mt-6 space-x-4">
                <Link to={`/admin/add-lesson/${courseId}`}>
                    <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-2 px-4 rounded">
                        Add Lessons
                    </button>
                </Link>
                <button
                    onClick={handleDelete}
                    className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-2 px-4 rounded"
                >
                    Delete Course
                </button>
            </div>
        </div>
        <Chatbot/>
        </div>
    );
}
import React, { useEffect, useState } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import { adminAPI } from "../../services/adminApi";

export default function CourseDetails() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const router = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            const token = localStorage.getItem('token');
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

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await adminAPI.deleteCourse( courseId ,{courseId}, token);
                if (response.status === 200) {
                    alert(response.data.message);
                    router('/admin/landing')
                } else {
                    alert("Failed to delete course");
                }
            } else {
                alert("Token not available");
            }
        } catch (e) {
            console.error("Error deleting course:", e);
        }
    };
    const getVideoThumbnail = (videoUrl) => {
        const videoId = videoUrl.split('v=')[1]?.split('&')[0];
        return videoId ? `https://img.youtube.com/vi/${videoId}/default.jpg` : null;
    };

    if (!course) return <p>Loading...</p>;

    return (
        <div className="p-8">
            <img src={course.imageUrl} alt="" className="w-48 h-48 rounded mb-4" />
            <h2 className="text-2xl font-semibold">{course.title}</h2>
            <p className="mt-2">Price: {course.price}</p>
            <p>{course.description}</p>
            <p className="text-sm mt-2">Category: {course.category}</p>
            <p className="text-sm mt-2">Difficulty: {course.difficulty}</p>
            {course.lessons && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Lessons</h3>
                    <ul>
                        {course.lessons.map((lesson, index) => (
                            <li key={index} className="mt-1">
                                <h4>{lesson.title}</h4>
                                <p>{lesson.content || "No content available"}</p>
                                {lesson.videoUrl && (
                                    <img
                                        src={getVideoThumbnail(lesson.videoUrl)}
                                        alt={`${lesson.title} thumbnail`}
                                        className="w-32 h-18 rounded mt-2"
                                    />
                                )}
                                <p>Duration: {lesson.duration || "N/A"}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <Link to={`/admin/add-lesson/${courseId}`}>
                <button className="bg-blue-400 text-white py-2 px-4 rounded mt-4">Add Lessons</button>
            </Link>
            
            <button
                onClick={handleDelete}
                className="bg-blue-400 ml-4 text-white py-2 px-4 rounded mt-4"
            >
                Delete Course
            </button>
        </div>
    );
}

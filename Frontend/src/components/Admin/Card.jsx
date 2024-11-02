import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { adminAPI } from "../../services/adminApi";

const CourseCard = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await adminAPI.getCourses(token);
                    setCourses(response.data.courses);
                } catch (e) {
                    console.error("Failed to fetch courses:", e);
                }
            } else {
                console.error("No token provided");
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="bg-black text-purple-500 font-poppins p-10 flex flex-wrap gap-6">
            {courses.map((course) => (
                <Link to={`/admin/course/${course._id}`} key={course._id}>
                    <div
                        className="border border-purple-700 text-purple-500 font-poppins rounded-lg p-6 w-60 cursor-pointer transition-transform transform hover:scale-105 shadow-lg"
                    >
                        <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="rounded w-full h-40 object-cover mb-4"
                        />
                        <div className="text-center">
                            <h3 className="text-lg font-semibold">{course.title}</h3>
                            <p className="text-md">Price: {course.price}</p>
                            <p className="text-sm">Description: {course.description}</p>
                        </div>
                    </div>
                </Link>
            ))}
            {courses.length === 0 && (
                <p className="text-gray-400 font-poppins">No Courses created yet</p>
            )}
        </div>
    );
};

export default memo(CourseCard);

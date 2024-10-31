// import { adminAPI } from "../../services/adminApi";
// import React, { useEffect, useState } from "react";
// import CourseFormModal from "./CourseModalForm";


// function CourseCard() {
//     const [courses, setCourses] = useState([]);
//     const [selectedCourse, setSelectedCourse] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     useEffect(() => {
//         const fetchCourses = async () => {
//             const token = localStorage.getItem("token");
//             if (token) {
//                 try {
//                     const response = await adminAPI.getCourses(token);
//                     setCourses(response.data.courses);
//                 } catch (e) {
//                     console.error("Failed to fetch courses", e);
//                 }
//             }
//         };
//         fetchCourses();
//     }, []);

//     const handleCardClick = (course) => {
//         setSelectedCourse(course);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedCourse(null);
//     };

//     return (
//         <div className="flex flex-wrap gap-4">
//             {courses.map((course) => (
//                 <div
//                     key={course._id}
//                     className="bg-blue border rounded-lg p-4 w-48 cursor-pointer transition-transform transform hover:scale-105 shadow-lg"
//                     onClick={() => handleCardClick(course)}
//                 >
//                     <img src={course.imageUrl} alt={course.title} className="rounded-lg w-full h-32 object-cover" />
//                     <div className="text-center mt-2">
//                         <h3 className="text-lg font-semibold text-white">{course.title}</h3>
//                         <p className="text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
// </svg>
// {course.price}</p>
//                     </div>
//                 </div>
//             ))}

//             {isModalOpen && selectedCourse && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
//                     onClick={closeModal}
//                 >
//                     <div
//                         className="bg-white p-6 rounded-lg w-full max-w-lg animate-slideIn relative shadow-lg"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <button
//                             className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
//                             onClick={closeModal}
//                         >
//                             X
//                         </button>
//                         <img src={selectedCourse.imageUrl} alt={selectedCourse.title} className="w-full h-48 rounded-lg object-cover mb-4" />
//                         <h2 className="text-2xl font-semibold">{selectedCourse.title}</h2>
//                         <p className="text-gray-700 mt-2">Price: ${selectedCourse.price}</p>
//                         <p className="text-gray-600 mt-2">{selectedCourse.description}</p>
//                         <p className="text-sm mt-2">Category: {selectedCourse.category}</p>
//                         <p className="text-sm mt-2">Difficulty: {selectedCourse.difficulty}</p>
//                         <CourseFormModal/>
//                         {selectedCourse.lessons && (
//                             <div className="mt-4">
//                                 <h3 className="text-lg font-semibold">Lessons</h3>
//                                 <ul className="list-disc list-inside">
//                                     {selectedCourse.lessons.map((lesson, index) => (
//                                         <li key={index} className="mt-1">
//                                             <h4 className="font-medium">{lesson.title}</h4>
//                                             <p className="text-sm">{lesson.content || "No content available"}</p>
//                                             <p className="text-xs text-gray-500">Duration: {lesson.duration || "N/A"}</p>
//                                         </li>
//                                     ))}

//                                 </ul>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default CourseCard;import { adminAPI } from "../../services/adminApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminAPI } from "../../services/adminApi";

export default function CourseCard() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem('token');
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
        <div className="flex flex-wrap gap-4 -z-10">
            {courses.map((course) => (
                <Link to={`/admin/course/${course._id}`} key={course._id}>
                    <div
                        className="bg-blue-400 border rounded p-8 w-52 z-50 cursor-pointer transition-transform transform hover:scale-105 shadow"
                    >
                        <img src={course.imageUrl} alt="" className="rounded w-48 h-48 object-cover" />
                        <div className="text-center mt-2">
                            <h3 className="text-lg font-semibold font-serif text-black">{course.title}</h3>
                            <p className="text-black font-normal font-serif">Price: {course.price}</p>
                            <p className="text-black font-normal font-serif">Difficulty: {course.difficulty}</p>
                        </div>
                    </div>
                </Link>
            ))}
            {
                courses.length == 0 && <p className="text-white font-normal font-serif">No Courses created yet</p>
            }
        </div>
    );
}

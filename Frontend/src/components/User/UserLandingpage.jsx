import React, { useState, useEffect } from 'react';
import { courseAPI } from '../../services/courseAPI';  
import CourseCard from '../Admin/Card'; 
import Search from './Search'; 
import debounce from 'lodash.debounce'; 

const UserLandingPage = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await courseAPI.getAllCourses(localStorage.getItem('token')); // Adjust token retrieval as needed
                setCourses(response.data.courses);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const debouncedSearch = debounce(handleSearch, 300);

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Courses</h1>
            <Search onSearch={debouncedSearch} />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCourses.map(course => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserLandingPage;

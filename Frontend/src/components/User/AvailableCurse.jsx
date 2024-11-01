import React, { useState, useEffect } from 'react';
import { courseAPI } from '../../services/courseAPI';  
import ExploreCourseCard from './ExploreCourse';
import Search from './Search'; 
import debounce from 'lodash.debounce'; 

const MyCoursesPage = () => {
    const [myCourses, setMyCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from local storage
                const response = await courseAPI.getMyCourses(token); // Adjust API method to fetch user courses
                setMyCourses(response.data.courses);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching my courses:", error);
                setLoading(false);
            }
        };

        fetchMyCourses();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const debouncedSearch = debounce(handleSearch, 300);

    const filteredCourses = myCourses.filter
    (course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Courses</h1>
            <Search onSearch={debouncedSearch} />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCourses.map(course => (
                        <ExploreCourseCard key={course._id} course={course} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCoursesPage;

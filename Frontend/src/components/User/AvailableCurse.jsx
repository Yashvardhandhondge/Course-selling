import React, { useState, useEffect, useCallback } from 'react';
import { courseAPI } from '../../services/courseAPI';  
import ExploreCourseCard from './ExploreCourse';
import Search from './Search'; 
import debounce from 'lodash.debounce'; 
import ProfileShortcut from './Profile';

const MyCoursesPage = () => {
    const [myCourses, setMyCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await courseAPI.getMyCourses(token); 
                setMyCourses(response.data.courses);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching my courses:", error);
                setLoading(false);
            }
        };

        fetchMyCourses();
    }, []);

    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
    }, []);

    const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

    const filteredCourses = myCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto">
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold text-white font-poppins mb-4">Purchased Courses</h1>
                <Search onSearch={debouncedSearch} />
                <Profileshortcut />
            </div>
            {loading ? (
                <p className="font-poppins text-white">Loading...</p>
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

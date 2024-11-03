import React from 'react';
import CourseCard from './CourseCard';
import Search from './Search';
import Profileshortcut from './Profile';

const AvailableCourses = ({ courses, searchTerm, wishlist, onUpdateWishlist }) => {
    const filteredCourses = courses.filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold hidden sm:hidden lg:inline-block text-white mb-4">Available Courses</h2>
                <Search />
                <Profileshortcut />
            </div>
            <div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCourses.map(course => (
                    <CourseCard key={course._id} course={course} wishlist={wishlist} onUpdateWishlist={onUpdateWishlist} />
                ))}
            </div>
        </>
    );
};

export default AvailableCourses;

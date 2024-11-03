import React from 'react';
import CourseCard from './CourseCard';
import Search from './Search';
import Profileshortcut from './Profile';

const Recommendations = ({ recommendations }) => (
    <>
        <div className="flex justify-between ml-12 lg:ml-64">
            <h2 className="text-2xl font-bold text-white mb-4">Recommended Courses</h2>
            <Search />
            <Profileshortcut />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map(course => (
                <CourseCard key={course._id} course={course} />
            ))}
        </div>
    </>
);

export default Recommendations;

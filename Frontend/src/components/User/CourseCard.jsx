import React from 'react';

const CourseCard = ({ course }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p>{course.description}</p>
            <p className="text-lg font-bold">${course.price}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                Purchase Course
            </button>
        </div>
    );
};

export default CourseCard;

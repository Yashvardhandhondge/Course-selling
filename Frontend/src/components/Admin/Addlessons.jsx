import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { adminAPI } from '../../services/adminApi';

function AddLessons() {
    const { courseId } = useParams(); 
    const token = localStorage.getItem('token');
    const [lessonCount, setLessonCount] = useState(0);
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLessonCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setLessonCount(count);
        setLessons(Array.from({ length: count }, () => ({ title: '', content: '', videoUrl: '', duration: '' })));
    };

    const handleLessonChange = (index, field, value) => {
        const updatedLessons = [...lessons];
        updatedLessons[index] = { ...updatedLessons[index], [field]: value };
        setLessons(updatedLessons);
    };

    const handleAddLessons = async (courseId) => {
        try {
            const lessonData = {
                lessons: lessons,
            };
            const token = localStorage.getItem('token')
            await adminAPI.addLessonId(courseId, lessonData, token); 
            setSuccess('Lessons added successfully!');
            setError('');
            
            setLessonCount(0);
            setLessons([]);
        } catch (error) {
            console.error('Error adding lessons:', error);
            setError('Failed to add lessons. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="w-full bg-black p-6">
            <h2 className="text-3xl font-semibold mb-4 text-blue-400">Add Lessons</h2>
            
            {success && <p className="text-green-500 mb-4">{success}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="mt-4 mb-6">
                <label className="block mb-2 text-lg text-blue-400">Number of Lessons:</label>
                <input
                    type="number"
                    value={lessonCount}
                    onChange={handleLessonCountChange}
                    min="1"
                    className="p-2 border bg-slate-400 text-black mb-4 w-[200px]"
                />
            </div>

            {lessons.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {lessons.map((lesson, index) => (
                        <div key={index} className="p-4 bg-slate-800 rounded-md mb-4">
                            <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
                                placeholder={`Lesson ${index + 1} Title`}
                                className="w-full bg-slate-400 p-2 mb-2 border rounded placeholder-black text-black"
                            />
                            <input
                                type="text"
                                value={lesson.content}
                                onChange={(e) => handleLessonChange(index, 'content', e.target.value)}
                                placeholder="Content"
                                className="w-full p-2 mb-2 border bg-slate-400 placeholder-black rounded text-black"
                            />
                            <input
                                type="text"
                                value={lesson.videoUrl}
                                onChange={(e) => handleLessonChange(index, 'videoUrl', e.target.value)}
                                placeholder="Video URL"
                                className="w-full p-2 mb-2 border bg-slate-400 placeholder-black rounded text-black"
                            />
                            <input
                                type="text"
                                value={lesson.duration}
                                onChange={(e) => handleLessonChange(index, 'duration', e.target.value)}
                                placeholder="Duration"
                                className="w-full p-2 mb-2 border bg-slate-400 placeholder-black rounded text-black"
                            />
                        </div>
                    ))}
                </div>
            )}

            <button
                onClick={()=> handleAddLessons(courseId)}
                className="bg-blue-400 text-black hover:text-white hover:bg-black font-serif border border-solid rounded px-4 py-2 mt-4"
            >
                Add Lessons
            </button>
        </div>
    );
}

export default AddLessons;

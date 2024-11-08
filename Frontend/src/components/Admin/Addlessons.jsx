import React, { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { adminAPI } from '../../services/adminApi';
import AdminNavbar from './Navbar';
import Fetchadmin from './FetchAdmin';
import Chatbot from '../Home/Chatbot';

function AddLessons() {
    const { courseId } = useParams();
    const token = localStorage.getItem('token');
    const [lessonCount, setLessonCount] = useState(0);
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLessonCountChange = useCallback((e) => {
        const count = parseInt(e.target.value, 10);
        setLessonCount(count);
        setLessons(Array.from({ length: count }, () => ({ title: '', content: '', videoUrl: '', duration: '' })));
    }, []);

    const handleLessonChange = useCallback((index, field, value) => {
        setLessons((prevLessons) => {
            const updatedLessons = [...prevLessons];
            updatedLessons[index] = { ...updatedLessons[index], [field]: value };
            return updatedLessons;
        });
    }, []);

    const handleAddLessons = async () => {
        try {
            const lessonData = { lessons };
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
        <div className="flex">
            <AdminNavbar />
            <div className="flex-grow h-screen bg-black p-4 font-poppins text-white ml-12 lg:ml-52">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-purple-400">Add Lessons</h2>
                    <Fetchadmin />
                </div>

                {success && <p className="text-green-500 mb-4">{success}</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="mt-4 mb-6">
                    <label className="block mb-2 text-lg text-purple-400">Number of Lessons:</label>
                    <input
                        type="number"
                        value={lessonCount}
                        onChange={handleLessonCountChange}
                        min="1"
                        className="p-2 border rounded-2xl text-black mb-4 w-[200px]"
                    />
                </div>

                {lessons.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {lessons.map((lesson, index) => (
                            <div key={index} className="p-4 rounded-md mb-4 border border-purple-700">
                                <input
                                    type="text"
                                    value={lesson.title}
                                    onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
                                    placeholder={`Lesson ${index + 1} Title`}
                                    className="rounded-2xl w-full p-2 mb-2 border placeholder-black text-black"
                                />
                                <input
                                    type="text"
                                    value={lesson.content}
                                    onChange={(e) => handleLessonChange(index, 'content', e.target.value)}
                                    placeholder="Content"
                                    className="p-2 mb-2 border rounded-2xl w-full placeholder-black text-black"
                                />
                                <input
                                    type="text"
                                    value={lesson.videoUrl}
                                    onChange={(e) => handleLessonChange(index, 'videoUrl', e.target.value)}
                                    placeholder="Video URL"
                                    className="p-2 mb-2 border rounded-2xl w-full placeholder-black text-black"
                                />
                                <input
                                    type="text"
                                    value={lesson.duration}
                                    onChange={(e) => handleLessonChange(index, 'duration', e.target.value)}
                                    placeholder="Duration"
                                    className="p-2 mb-2 border rounded-2xl w-full placeholder-black text-black"
                                />
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="mt-4">
                    <Link to="/admin/landing">
                        <button
                            onClick={handleAddLessons}
                            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-serif border border-solid px-4 py-2 rounded-2xl transition-transform hover:scale-105"
                        >
                            Add Lessons
                        </button>
                    </Link>
                </div>
            </div>
            <Chatbot/>
        </div>
    );
}

export default React.memo(AddLessons);
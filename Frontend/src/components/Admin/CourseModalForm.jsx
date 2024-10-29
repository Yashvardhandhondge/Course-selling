import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/adminApi';

function CourseFormModal({ isOpen, onClose, initialData, token }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    price: '',
    category: '',
    difficulty: '',
  });
  const [lessons, setLessons] = useState([]);
  const [lessonCount, setLessonCount] = useState(1);
  const [showContentConfirmation, setShowContentConfirmation] = useState(false);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...lessons];
    updatedLessons[index] = { ...updatedLessons[index], [field]: value };
    setLessons(updatedLessons);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData) {
        await adminAPI.updateCourse({ ...formData, courseId: initialData._id }, token);
      } else {
        await adminAPI.createCourse(formData, token);
      }
      setShowContentConfirmation(true);
    } catch (error) {
      console.error('Error submitting course form:', error);
    }
  };

  const handleAddLessons = async () => {
    try {
      await adminAPI.addLesson({ courseId: initialData?._id, lesson: lessons }, token);
      onClose();
    } catch (error) {
      console.error('Error adding lessons:', error);
    }
  };

  const handleLessonCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setLessonCount(count);
    setLessons(Array.from({ length: count }, () => ({ title: '', content: '', videoUrl: '', duration: '' })));
  };

  return (
    <>
      {showContentConfirmation ? (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-black text-white p-6 rounded'>
            <p>Do you want to add content to this course?</p>
            <button onClick={() => { setShowContentConfirmation(false); onClose(); }} className='mr-4'>
              No
            </button>
            <button onClick={() => { setShowContentConfirmation(false); setLessonCount(1); }} className='bg-blue-500 text-white rounded px-4 py-2'>
              Yes
            </button>
          </div>
        </div>
      ) : (
        isOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='w-full h-full bg-black overflow-y-auto p-8'>
              <h2 className='text-3xl font-semibold mb-6 font-serif text-blue-400'>
                {initialData ? 'Update Course' : 'Create Course'}
              </h2>
              <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <input type="text" name='title' value={formData.title} onChange={handleChange} placeholder='Title' className='w-full bg-slate-400 placeholder-black text-black font-serif p-3 border rounded' />
                <input type="text" name='price' value={formData.price} onChange={handleChange} placeholder='Price' className='w-full bg-slate-400 placeholder-black text-black p-3 border rounded' />
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder='Image URL' className='w-full bg-slate-400 placeholder-black text-black p-3 border rounded' />
                <input type="text" name='category' value={formData.category} onChange={handleChange} placeholder='Category' className='w-full bg-slate-400 placeholder-black text-black border rounded' />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder='Description' className='w-full bg-slate-400 placeholder-black text-black p-3 border rounded'></textarea>
                <input type="text" name='difficulty' value={formData.difficulty} onChange={handleChange} placeholder='Difficulty' className='w-full bg-slate-400 placeholder-black text-black p-3 border rounded' />
                <button type='submit' className='w-[200px] bg-blue-400 hover:text-white hover:bg-black border border-solid text-black font-serif rounded px-4 py-2'>
                  {initialData ? 'Update Course' : 'Create Course'}
                </button>
              </form>
              
              <div className='mt-4'>
                <label className='block mb-2 text-lg text-blue-400'>Number of Lessons:</label>
                <input type="number" value={lessonCount} onChange={handleLessonCountChange} min='1' className='p-2 border bg-slate-400 text-black mb-6 w-[200px]' />
              </div>
              
              {lessons.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {lessons.map((lesson, index) => (
                    <div key={index} className='p-4 rounded bg-black'>
                      <input type="text" value={lesson.title} onChange={(e) => handleLessonChange(index, 'title', e.target.value)} placeholder={`Lesson ${index + 1} Title`} className='w-full bg-slate-400 p-2 mb-2 border rounded placeholder-black font-serif text-black' />
                      <input type="text" value={lesson.content} onChange={(e) => handleLessonChange(index, 'content', e.target.value)} placeholder='Content' className='w-full p-2 mb-2 border bg-slate-400 placeholder-black font-serif rounded text-black' />
                      <input type="text" value={lesson.videoUrl} onChange={(e) => handleLessonChange(index, 'videoUrl', e.target.value)} placeholder='Video URL' className='w-full p-2 mb-2 border bg-slate-400 placeholder-black font-serif rounded text-black' />
                      <input type="text" value={lesson.duration} onChange={(e) => handleLessonChange(index, 'duration', e.target.value)} placeholder='Duration' className='w-full p-2 mb-2 border bg-slate-400 placeholder-black font-serif rounded text-black' />
                    </div>
                  ))}
                </div>
              )}

              <button onClick={handleAddLessons} className='mt-6 bg-blue-400 text-black font-serif hover:text-white hover:bg-black border border-solid rounded px-4 py-2'>
                Add Lessons
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default CourseFormModal;

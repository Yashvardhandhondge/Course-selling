import React, { useState, useEffect, useRef } from 'react';
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
  
  const formRef = useRef(null);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData) {
        await adminAPI.updateCourse({ ...formData, courseId: initialData._id }, token);
      } else {
        await adminAPI.createCourse(formData, token);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting course form:', error);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={formRef} className="bg-white p-6 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">{initialData ? 'Update Course' : 'Create Course'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 mb-3 border rounded"/>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 mb-3 border rounded"/>
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full p-2 mb-3 border rounded"/>
          <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 mb-3 border rounded"/>
          <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full p-2 mb-3 border rounded"/>
          <input type="text" name="difficulty" value={formData.difficulty} onChange={handleChange} placeholder="Difficulty" className="w-full p-2 mb-3 border rounded"/>
          <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded w-full">
            {initialData ? 'Update Course' : 'Create Course'}
          </button>
        </form>
      </div>
    </div>
  ) : null;
}

export default CourseFormModal;

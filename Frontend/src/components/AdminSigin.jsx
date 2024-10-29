import React, { useState } from 'react';
import { adminAPI } from '../services/adminApi';
import { Link,useNavigate } from 'react-router-dom';

const AdminSignin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      return;
    }

   
    try {
      const response = await adminAPI.signin(formData);
      setMessage(response.data.message);
      const token = response.data.token;
      if(token){
        localStorage.setItem('token',token);
        navigate('/admin/Landing')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <div className="bg-white relative lg:py-20 h-56 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto xl:px-5 lg:px-10 w-full">
        <div className="w-full lg:w-7/12 max-w-md lg:max-w-2xl">
          <div className="flex justify-center lg:justify-end w-full h-full">
            <img
              src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png"
              alt="Admin Illustration"
              className="w-full lg:w-auto"
            />
          </div>
        </div>
     
        <div className="w-full lg:w-5/12 mt-12 lg:mt-0">
          <div className="p-10 bg-white shadow-2xl rounded-xl">
            <h1 className="text-4xl font-serif text-center font-medium mb-6">Sign In</h1>
            <form onSubmit={handleSubmit} className="space-y-8">
              {message && <div className="text-green-600 mb-4">{message}</div>}
              {error && <div className="text-red-600 mb-4">{error}</div>}
                    
              <div className="relative">
                <label className="text-gray-600 font-medium bg-white px-2 -mt-3 absolute ml-2">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="123@ex.com"
                  className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-4 text-base block bg-white border-gray-300 rounded-md mt-2"
                  required
                />
              </div>

         
              <div className="relative">
                <label className="text-gray-600 font-medium bg-white px-2 -mt-3 absolute ml-2">Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-4 text-base block bg-white border-gray-300 rounded-md mt-2"
                  required
                />
              </div>

            
              <button
                type="submit"
                className="w-full py-4 text-xl font-medium text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600"
              >
                Sign In
              </button>

        
              <p className="text-center text-xs text-gray-600 mt-6">
                Don't have an account? 
                <Link to="/admin/signup" className="text-indigo-500 border-b border-indigo-500 ml-1">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignin;

import React, { useState, useCallback } from 'react';
import { adminAPI } from '../../services/adminApi';
import { Link, useNavigate } from 'react-router-dom';
import { PiBasketballBold } from "react-icons/pi";

const AdminSignin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
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
      if (token) {
        localStorage.setItem('token', token);
        navigate('/admin/Landing');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed.');
    }
  }, [formData, navigate]); // Dependency array includes formData and navigate

  return (
    <div className="bg-black h-screen w-screen font-poppins">
      <div className='flex p-4'>
        <Link to='/' className='flex'>
          <PiBasketballBold className='text-blue-500 text-5xl p-2' />
          <p className="text-3xl mt-[5px] mb-[20px] text-white">Koursely</p>
        </Link>
      </div>

      <div className="flex">
        <div className="flex flex-col items-center justify-center w-full h-full mt-[100px] relative lg:pr-10">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/047/732/611/large/glowing-looping-world-teacher-day-children-giving-flowers-and-gifts-to-a-smiling-teacher-neon-frame-effect-black-background-free-video.jpg"
            className="btn-"
            alt="Sign up illustration"
          />
        </div>

        <div className="w-full ml-[20px] mt-[50px] mr-0 mb-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
          <div className="flex flex-col mt-[100px] ml-[20px] items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-black shadow-2xl rounded-xl relative z-10">
            <h1 className="w-full text-purple-500 mr-[900px] text-4xl font-medium leading-snug mb-[20px]">Sign In</h1>
            <form onSubmit={handleSubmit} className="space-y-8">
              {message && <div className="text-green-600 mb-4">{message}</div>}
              {error && <div className="text-red-600 mb-4">{error}</div>}

              <div className="relative">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border placeholder-black outline-none focus:border-black w-[300px] pt-3 pr-2 pb-3 pl-2 mt-[10px] text-base block bg-white border-gray-300 rounded-2xl"
                  required
                />
              </div>

              <div className="relative">
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="border placeholder-black outline-none focus:border-black w-[300px] pt-3 pr-2 pb-3 pl-2 mt-1 text-base block bg-white border-gray-300 rounded-2xl"
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-block w-[300px] pt-3 pr-2 pb-3 pl-2 mt-1 rounded-2xl text-xl font-medium text-center text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 transition duration-200 hover:bg-white hover:scale-95 hover:text-black border-solid ease"
              >
                Sign In
              </button>

              <p className="mt-6 text-xs text-white text-center">
                Don't have an account? &nbsp;
                <Link to="/admin/signup" className="text-purple-500 border-b border-purple-500 border-dotted">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignin;

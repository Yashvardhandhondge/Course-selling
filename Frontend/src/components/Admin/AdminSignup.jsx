import React, { useState, useCallback, useMemo } from 'react';
import { adminAPI } from '../../services/adminApi';
import { compressImage } from '../../utlis/imageCompressionHelper';
import { Link, useNavigate } from 'react-router-dom';
import { PiBasketballBold } from "react-icons/pi";

const AdminSignup = React.memo(() => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    image: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleImageChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedImageDataURL = await compressImage(file);
        setFormData((prev) => ({ ...prev, image: compressedImageDataURL }));
      } catch (error) {
        setError('Image compression failed');
      }
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!formData.email || !formData.password || !formData.firstname || !formData.lastname) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await adminAPI.signup(formData);
      const token = response.data.token;
      setMessage(response.data.message);

      if (token) {
        localStorage.setItem('token', token);
        navigate('/admin/Landing');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Signup failed.');
    }
  }, [formData, navigate]);

  return (
    <div className=" h-full min-h-screen   bg-black">
      <div className='flex p-4 items-center justify-center sm:justify-start'>
        <Link to='/' className='flex items-center space-x-2'>
          <PiBasketballBold className='text-blue-400 text-4xl p-1 sm:p-2 lg:p-0' />
          <p className="text-2xl sm:text-3xl text-white font-poppins font-bold">Koursely</p>
        </Link>
      </div>

      
        <div className="flex">
          <div>
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/047/732/611/large/glowing-looping-world-teacher-day-children-giving-flowers-and-gifts-to-a-smiling-teacher-neon-frame-effect-black-background-free-video.jpg"
                className="hideen sm:block lg:w-3/4 xl:w-full"
                alt="Sign up illustration"
              />
            </div>
          </div>
          <div className="w-full mt-20 mr-0 mb-0 ml-14 sm:ml-14 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-start justify-start pr-10 pb-10 pl-10 bg-black shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-purple-500 mr-[900px] text-4xl font-medium leading-snug">Sign up as Educator</p>
              {message && <div className="text-green-600 dark:text-green-400 mb-4">{message}</div>}
              {error && <div className="text-red-600 dark:text-red-400 mb-4">{error}</div>}
              <div className="w-[300] relative space-y-8">
                <div className="relative">
                  <input
                    name="firstname"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="First name"
                    className="border placeholder-black focus:outline-none focus:border-black w-[300px] pt-3 pr-2 pb-3 pl-2 mt-5 text-base block bg-white border-gray-300 rounded-2xl"
                  />
                </div>
                <div className="relative">
                  <input
                    name="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="border placeholder-black focus:outline-none focus:border-black w-[300px] pt-3 pr-2 pb-3 pl-2 text-base block bg-white border-gray-300 rounded-2xl"
                  />
                </div>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border placeholder-black focus:outline-none focus:border-black w-[300px] pt-3 pr-2 pb-3 pl-2 text-base block bg-white border-gray-300 rounded-2xl"
                  />
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="border placeholder-black focus:outline-none focus:border-black w-[300px] pt-3 pr-2 pb-3 pl-2 text-base block bg-white border-gray-300 rounded-2xl"
                  />
                </div>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border placeholder-black focus:outline-none focus:border-black w-[300px] pt-3 pr-2 pb-3 pl-2 text-base block bg-white border-gray-300 rounded-2xl"
                  />
                </div>
                <div className="relative">
                  <button
                    type="submit"
                    className="inline-block w-[300px] pt-3 pr-2 pb-3 pl-2 mt-1 text-xl font-medium text-center text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:scale-95 transition-transform transform rounded-2xl duration-200 hover:bg-white hover:text-black border-solid ease"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <p className="mt-6 text-xs text-white text-center">
                Already have an account? &nbsp;
                <Link to="/admin/signin" className="text-purple-500 border-b border-indigo-500 border-dotted">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    
  );
});

export default AdminSignup;

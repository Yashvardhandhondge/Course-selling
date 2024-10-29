import React, { useState } from 'react';
import { adminAPI } from '../services/adminApi';
import imageCompression from 'browser-image-compression';
import { Link,useNavigate } from 'react-router-dom';
import { PiBasketballBold } from "react-icons/pi";
const AdminSignup = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
        setError('Image compression failed.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!formData.email || !formData.password || !formData.firstname || !formData.lastname) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await adminAPI.signup(formData);
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
    <div className="bg-black  ">
      <div className='flex'>
       <PiBasketballBold className='text-blue-500  text-5xl p-2' /> <p className="text-3xl mt-1 font-serif text-white">Koursely</p>  

       </div>
      <div className='border-t-[1px] border-zinc-700 mt-2 flex justify-center '></div>
      <div className=" ">
        <div className="flex ">
          <div >
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/047/732/611/large/glowing-looping-world-teacher-day-children-giving-flowers-and-gifts-to-a-smiling-teacher-neon-frame-effect-black-background-free-video.jpg"
                className="btn- "
                alt="Sign up illustration"
              />
            </div>
          </div>
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-black shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-blue-500 mr-[900px] text-4xl font-medium  leading-snug font-serif">Sign up as Educator</p>
              {message && <div className="text-green-600 dark:text-green-400 mb-4">{message}</div>}
              {error && <div className="text-red-600 dark:text-red-400 mb-4">{error}</div>}
              <div className="w-[300] mt-6 relative space-y-8">
                <div className="relative">
                  
                  <input
                    name="firstname"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="First name"
                    className="border placeholder-black font-serif focus:outline-none focus:border-black w-[300px] pt-3 pr-2 pb-3 pl-2 mt-1 text-base block bg-slate-400 border-gray-300 rounded-md"
                  />
                </div>
                <div className="relative">
                 
                  <input
                    name="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="border placeholder-black font-serif focus:outline-none focus:border-black  w-[300px] pt-3 pr-2 pb-3 pl-2 mt-1  text-base block bg-slate-400 border-gray-300 rounded-md"
                  />
                </div>
                <div className="relative">
                
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border placeholder-black font-serif focus:outline-none focus:border-black  w-[300px] pt-3 pr-2 pb-3 pl-2 mt-1  text-base block bg-slate-400  border-gray-300 rounded-md"
                  />
                </div>
                <div className="relative">
                
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="border placeholder-black font-serif focus:outline-none focus:border-black w-[300px] pt-3 pr-2 pb-3 pl-2 mt-1 text-base block bg-slate-300 border-gray-300 rounded-md"
                  />
                </div>
                <div className="relative">
              
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    placeholder='Image'
                    className="border placeholder-black font-serif focus:outline-none focus:border-black  w-[300px] pt-3 pr-2 pb-3 pl-2 mt-1  text-base block bg-slate-300  border-gray-300 rounded-md"
                  />
                </div>
                <div className="relative">
                  <button
                    type="submit"
                    className=" inline-block  w-[300px] pt-3 pr-2 pb-3 pl-2 mt-1  text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-white hover:text-black border-solid ease"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <p className="mt-6 text-xs text-gray-600 text-center">
                Already have an account?
                <Link to="/admin/signin" className="text-indigo-500 border-b border-indigo-500 border-dotted">
                  {' '}
                  Sign In{' '}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;

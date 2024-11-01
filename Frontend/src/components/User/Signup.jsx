import React, { useState, useCallback } from 'react';
import { userAPI } from '../../services/userAPI';
import { compressImage } from '../../utlis/imageCompressionHelper';
import { Link, useNavigate } from 'react-router-dom';
import { PiBasketballBold } from "react-icons/pi";

const Signup = React.memo(() => {
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
        setError('Image compression failed.');
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
      const response = await userAPI.signup(formData);
      setMessage(response.data.message);

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/user/landing');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed.');
    }
  }, [formData, navigate]);

  return (
    <div className="min-h-screen w-full bg-[#2E0249] text-white flex justify-center">
       


      <div className="flex-1  text-center hidden lg:flex">
          <div className=" ml-[100px] xl:m-16 mr-[300px] w-[600px] bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(https://pbs.twimg.com/media/GbPcJ7kakAAEmRy?format=png&name=900x900)' }}
          >
          </div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 mr-[100px] mt-10 p-6 sm:p-10">
          <div className='flex  '>
            <PiBasketballBold className='text-3xl ml-[170px] mt-1 text-blue-400' />
            <p className="text-4xl font-serif ml-[10px] text-white">Koursely</p>
          </div>
           
           <h1 className='ml-[210px] text-2xl xl:text-3xl font-extrabold mt-[10px] font-serif'>Sign Up</h1>
            <form className="w-full flex-1 mt-8" onSubmit={handleSubmit}>
              {message && <div className="text-purple-600 mb-4">{message}</div>}
              {error && <div className="text-pruple-600 mb-4">{error}</div>}
              
              <div className="mx-auto max-w-xs space-y-6">
              <div>
                <input
                  name="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="ml-[40px] w-[250px] px-8 py-4 rounded-lg font-medium  bg-gray-100 border border-gray-200 placeholder-black font-serif text-sm focus:outline-none focus:border-gray-400"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div>
                <input
                  name="lastname"
                  type="text"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="ml-[40px] w-[250px] px-8 py-4 rounded-lg font-medium  bg-gray-100 border border-gray-200 placeholder-black font-serif text-sm focus:outline-none focus:border-gray-400"
                  placeholder="Enter last name"
                  required
                />
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="ml-[40px] w-[250px] px-8 py-4 rounded-lg font-medium  bg-gray-100 border border-gray-200 placeholder-black font-serif text-sm focus:outline-none focus:border-gray-400"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="ml-[40px] w-[250px] px-8 py-4 rounded-lg font-medium  bg-gray-100 border border-gray-200 placeholder-black font-serif text-sm focus:outline-none focus:border-gray-400"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="ml-[40px] w-[250px] px-8 py-4 rounded-lg font-medium  bg-gray-100 border border-gray-200 placeholder-black font-serif text-sm focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className=" ml-[155px] mt-4 w-[250px] py-4 rounded-lg font-semibold bg-purple-500 cursor-pointer text-gray-100 hover:bg-purple-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none"
            >
              Sign Up
            </button>

            <p className="mt-6 text-xs text-gray-600 text-center">
              Already have an account? 
              <Link to="/signin" className="text-purple-500 border-b border-purple-500 border-dotted"> Sign In </Link>
            </p>
          </form>
        </div>
      </div>
    
  );
});

export default Signup;

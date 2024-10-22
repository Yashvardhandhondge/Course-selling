import React, { useState } from 'react';
import { userAPI } from '../services/userAPi'; 
import imageCompression from 'browser-image-compression';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    image: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // Add dark mode state

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

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
      const response = await userAPI.signup(formData);
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen h-full w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex justify-center`}>
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p- sm:p-10">
          
          <div className="text-center">
            <div className="text-4xl font-extrabold text-indigo-500 dark:text-indigo-300">
              Y-Learn
            </div>
            </div>

          <div className="mt-8 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold dark:text-white">Sign Up</h1>
            <form className="w-full flex-1 mt-8" onSubmit={handleSubmit}>
              {message && <div className="text-green-600 dark:text-green-400 mb-4">{message}</div>}
              {error && <div className="text-red-600 dark:text-red-400 mb-4">{error}</div>}
              
              <div className="mx-auto max-w-xs space-y-6">
                <div>
                  <label className="text-gray-800 dark:text-gray-200 text-sm mb-2 block">First Name</label>
                  <input
                    name="firstname"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-800 dark:text-gray-200 text-sm mb-2 block">Last Name</label>
                  <input
                    name="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600"
                    placeholder="Enter last name"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-800 dark:text-gray-200 text-sm mb-2 block">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-800 dark:text-gray-200 text-sm mb-2 block">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600"
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-800 dark:text-gray-200 text-sm mb-2 block">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-5 w-full py-4 rounded-lg font-semibold bg-indigo-500 dark:bg-indigo-600 text-gray-100 dark:text-gray-100 hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none"
              >
                Sign Up
              </button>

              <p className="mt-6 text-xs text-gray-600 dark:text-gray-400 text-center">
                I agree to abide by the
                <a href="#" className="border-b border-gray-500 dark:border-gray-400 border-dotted"> Terms of Service </a>
                and its
                <a href="#" className="border-b border-gray-500 dark:border-gray-400 border-dotted"> Privacy Policy </a>.
              </p>
            </form>
          </div>
        </div>
        
        <div className="flex-1 bg-indigo-100 dark:bg-indigo-900 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg)' }}
          >
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

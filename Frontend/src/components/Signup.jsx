import React, { useState } from 'react';
import { userAPI } from '../services/userAPi'; 
import { compressImage } from '../utlis/imageCompressionHelper';
import { Link } from 'react-router-dom';


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
  



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedImageDataURL = await compressImage(file);
        setFormData((prev) => ({ ...prev, image: compressedImageDataURL }));
      } catch (error) {
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

      const token = response.data.token;
      if(token){
        localStorage.setItem('token',token);
        window.location.href ='/user/landing'
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <div className={`  min-h-screen w-full bg-gray-100  text-gray-900  flex justify-center`}>
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white  shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p- sm:p-10">
          
          <div className="text-center">
            <div className="text-4xl font-extrabold text-indigo-500 ">
              Learn Hub
            </div>
            </div>

          <div className="mt-8 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold ">Sign Up</h1>
            <form className="w-full flex-1 mt-8" onSubmit={handleSubmit}>
              {message && <div className="text-green-600  mb-4">{message}</div>}
              {error && <div className="text-red-600  mb-4">{error}</div>}
              
              <div className="mx-auto max-w-xs space-y-6">
                <div>
                  <label className="text-gray-800  text-sm mb-2 block">First Name</label>
                  <input
                    name="firstname"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100   border border-gray-200 placeholder-gray-500  text-sm focus:outline-none focus:border-gray-400  focus:bg-white "
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-800  text-sm mb-2 block">Last Name</label>
                  <input
                    name="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100   border border-gray-200 placeholder-gray-500  text-sm focus:outline-none focus:border-gray-400  focus:bg-white "
                    placeholder="Enter last name"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-800  text-sm mb-2 block">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100   border border-gray-200 placeholder-gray-500  text-sm focus:outline-none focus:border-gray-400  focus:bg-white "
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-800  text-sm mb-2 block">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  focus:bg-white "
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-800  text-sm mb-2 block">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100   border border-gray-200 placeholder-gray-500  text-sm focus:outline-none focus:border-gray-400  focus:bg-white "
                  />
                </div>
              </div>
               
              <button
                type="submit"
                className="mt-5 w-full py-4 rounded-lg font-semibold bg-indigo-500 dark:bg-indigo-600 text-gray-100  hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none"
              >
                Sign Up
              </button>
              

              <p className="mt-6 text-xs text-gray-600 text-center">
                Already have an account? 
                <Link to="/signin" className="text-indigo-500 border-b border-indigo-500 border-dotted"> Sign In </Link>
              </p>
            </form>
          </div>
        </div>
        
        <div className="flex-1 bg-indigo-100  text-center hidden lg:flex">
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

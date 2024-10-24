import React, { useState } from 'react';
import { adminAPI } from '../services/adminApi';
import { Link } from 'react-router-dom';

const AdminSignin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
    } catch (err) {
      setError(err.response?.data?.message || 'Signin failed.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p- sm:p-10">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-indigo-500">Learn Spot</div>
          </div>

          <div className="mt-8 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
            <form className="w-full flex-1 mt-8" onSubmit={handleSubmit}>
              {message && <div className="text-green-600 mb-4">{message}</div>}
              {error && <div className="text-red-600 mb-4">{error}</div>}

              <div className="mx-auto max-w-xs space-y-6">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-5 w-full py-4 rounded-lg font-semibold bg-indigo-500 text-gray-100 hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none"
              >
                Sign In
              </button>

              <p className="mt-6 text-xs text-gray-600 text-center">
                Don't have an account? 
                <Link to="/admin/signup" className="text-indigo-500 border-b border-indigo-500 border-dotted"> Sign Up </Link>
              </p>
            </form>
          </div>
        </div>
        
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg)' }}
          >
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignin;

import React, { useState, useCallback } from 'react';
import { userAPI } from '../../services/userAPI';
import { Link, useNavigate } from 'react-router-dom';
import { PiBasketballBold } from "react-icons/pi";

const Signin = React.memo(() => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      return;
    }

    try {
      const response = await userAPI.signin(formData);

      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); 
        setMessage(response.data.message);
        navigate('/user/landing');
      } else {
        setError('Signin failed. No token received.');
      }
    } catch (err) {
      console.error('Signin Error:', err); 
      setError(err.response?.data?.message || 'Signin failed.');
    }
  }, [formData, navigate]);

  return (
    <div className="min-h-screen w-full bg-[#2E0249] font-poppins text-white">
      <div className='flex p-4 '>
        <PiBasketballBold className='text-blue-500 h-8 w-8 mt-[3px] mr-4' />
        <p className="text-4xl font-bold text-white">Koursely</p>
      </div>

      <div className='flex justify-start'>
        <div
          className="w-[600px] h-[700px] bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://pbs.twimg.com/media/GbPpiUDakAAlvJ4?format=png&name=900x900)' }}
        ></div>

        <div className='ml-64 mt-36'>
          <h1 className="text-2xl mb-[30px]">Sign In</h1>
          <form onSubmit={handleSubmit}>
            {message && <div className="text-purple-600 mb-4">{message}</div>}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            
            <div>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-[250px] mb-[20px] px-8 py-4 rounded-2xl font-medium text-black bg-gray-100 border border-gray-200 placeholder-black text-sm focus:outline-none focus:border-gray-400"
                placeholder="Enter email"
                required
              />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-[250px] px-8 mb-[20px] py-4 rounded-2xl font-medium text-black bg-gray-100 border border-gray-200 placeholder-black text-sm focus:outline-none focus:border-gray-400"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-[250px] py-4 mb-[20px] rounded-2xl font-semibold shadow-sm bg-purple-500 cursor-pointer text-gray-100 hover:bg-purple-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none"
            >
              Sign In
            </button>

            <p className="text-xs text-gray-600 ">
              Don't have an account?
              <Link to="/signup" className="text-purple-500 border-b border-purple-500 border-dotted"> Sign Up </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
});

export default Signin;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiCircleChevDown } from "react-icons/ci";
import Chatbot from './Chatbot';

function HomePage()  {
    const [showUserOptions,setShowUserOptions]=useState(false);
    const [showAdminOptions,setAdminOptions]=useState(false)
    return (
        <div className='w-full h-screen bg-slate-100'>
            <div className='flex justify-between items-center'>
                <div>
            <div className="text-center p-2">
            <div className="text-4xl font-extrabold text-indigo-500 dark:text-indigo-300">
              <img src="data:image/png;base64,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" 
              className='h-20 w-20 rounded-full'
              alt="" />
            </div>
            </div>
            </div>
            
           <div className='flex justify-center   space-x-10'>
                <div className="relative">
                    <button
                        className="flex items-center px-4 py-2 text-zinc-700  rounded-lg hover:bg-sky-600 transition duration-300"
                        onClick={() => setShowUserOptions(!showUserOptions)}
                    >
                        Student <CiCircleChevDown className="ml-2 text-xl" />
                    </button>
                    {showUserOptions && (
                        <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                            <Link
                                to="/signin"
                                className="block px-4 py-2 text-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 transition duration-300"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="block px-4 py-2 text-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 transition duration-300"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                
                <div className="relative">
                    <button
                        className="flex items-center px-4 py-2 text-zinc-800  rounded-lg hover:bg-sky-600 transition duration-300 scale-95"
                        onClick={() => setAdminOptions(!showAdminOptions)}
                    >
                        Educator <CiCircleChevDown className="ml-2 text-xl" />
                    </button>
                    {showAdminOptions && (
                        <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                            <Link
                                to="/admin/signup"
                                className="block px-4 py-2 text-red-500 hover:bg-red-50 hover:text-red-700 transition duration-300"
                            >
                                Admin Sign Up
                            </Link>
                            <Link
                                to="/admin/signin"
                                className="block px-4 py-2 text-red-500 hover:bg-red-50 hover:text-red-700 transition duration-300"
                            >
                                Admin Sign In
                            </Link>
                        </div>
                    )}
                </div>
                </div>
                </div>
                <div className='border-t-[1px] border-zinc-700 mt-2 flex justify-center '></div>
                <Chatbot/>
        </div>
    );
};

export default HomePage;

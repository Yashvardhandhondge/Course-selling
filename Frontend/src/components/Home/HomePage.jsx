import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiCircleChevDown } from "react-icons/ci";
import Chatbot from './Chatbot';
import About from './About';
import Admin from './Admin';
import { PiBasketballBold } from "react-icons/pi";

import Student from './Student';
function HomePage()  {
    
   
    return (
        <div className='w-full h-screen bg-black p-4 '>
            <div className='flex justify-between items-center'>
            <div className="text-4xl flex text-white font-serif ml-14 font-extrabold">
                
            <PiBasketballBold className='mr-5 text-blue-500 h-10' />   Koursely
            </div>
           <div className='flex justify-center  space-x-10'>
           <Student />
                <Admin/>
                </div>
                </div>
                <div className='border-t-[1px] border-zinc-700 mt-2 flex justify-center '></div>
                <div className='text-white'>
                    <About />
                </div>
                <Chatbot/>
        </div>
    );
};

export default HomePage;

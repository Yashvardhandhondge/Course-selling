import React, { useState,useEffect } from 'react';
import Chatbot from './Chatbot';
import About from './About';
import Admin from './Admin';
import {InfoSection,Features,Footer,ScrollIndicator} from './Info'
import { PiBasketballBold } from "react-icons/pi";
import Student from './Student';


   function HomePage()  {
    
   
      return (
          <div className='w-screen min-h-screen bg-gradient-to-r from-black to-[#2E0249]  '>
            <div className='flex justify-between items-center p-4 md:p-6 lg:p-8'>
            <div className="text-4xl flex text-white font-poppins font-extrabold ml-0 sm:ml-4 md:ml-10 lg:ml-14  ">
                
            <PiBasketballBold className='mr-2 text-blue-500 font-poppins h-5 sm:h-5 md:h-8 lg:h-10 ' /> 
            <span className='text-sm sm:text-sm md:text-3xl lg:text-4xl '>Koursely</span>  
            </div>
           <div className='flex justify-center  space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10'>
                <Admin/>
                <Student />
                </div>
            </div>
                {/* <ScrollIndicator/> */}
                <div className='text-white'>
                <About />
                </div>
                <Chatbot/>
                <InfoSection/>
                <Features />
                <Footer />
                
        </div>
    );
};

export default HomePage;

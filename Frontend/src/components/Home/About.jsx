import React from 'react';
import { Link } from 'react-router-dom';

const About = React.memo(() => {
  return (
    <div className='flex flex-col lg:flex-row justify-between items-center lg:items-start'>
      <div className='m-6 lg:m-[100px] h-full text-center lg-text-left'>
        <p className='font-poppins text-3xl sm:text-5xl lg:text-7xl p-2'>Explore Live</p>
        <p className='font-poppins text-3xl sm:text-5xl lg:text-7xl p-2'>Creative classes</p>
        <p className='mt-2 mx-4 lg:mx-3 font-poppins text-sm sm:text-base lg:text-lg'>Choose from over 2,000+ courses on topics like Web Development, DSA,</p>
        <p className='p-1 mx-4 lg:ml-2 font-poppins text-sm sm:text-base lg:text-lg'>DevOps, Web3 & many more ..</p>
        <br />
        <div className=' flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 '>
        <Link to="/signup" className=' px-4 py-2 font-poppins hover:bg-black hover:text-white font-semibold border rounded border-solid bg-purple-400 text-black ml-0 sm:ml-1 md:ml-2 lg:ml-40'>
          Get Started
        </Link>
        <Link to="/" className='border rounded border-solid px-4 py-2 hover:bg-purple-400 hover:text-black font-poppins font-semibold transform-transition'>
          Learn more
        </Link>
        </div>
      </div>

      <div className='hidden lg:flex mt-8 lg:mt-[100px] lg:mr-28 justify-center lg:justify-end'>
        <img 
          src="https://pbs.twimg.com/media/GbR2CYzakAIelxz?format=jpg&name=medium" 
          className='rounded w-[600px] h-[400px] text-black bg-black'
          alt="" 
        />
      </div>
    </div>
  );
});

export default About;

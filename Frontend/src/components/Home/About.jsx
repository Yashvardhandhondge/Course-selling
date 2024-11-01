import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    
    <div className='flex justify-between'>
        
        <div className='m-[100px]  h-full'>
            <p className='font-poppins text-7xl p-2'>Explore Live</p>
            <p className='font-poppins text-7xl p-2'>Creative classes</p>
            <p className='mt-2 ml-3 font-serif'>Choose from over 2,000+ courses on topics like Web Devlopment, Dsa, </p>
            <p className='p-1 ml-2 font-serif'>Devops ,Web3 & many more ..</p>
          <br />
            <Link to="/signup" className='px-5 py-3 m-4 font-poppins hover:bg-black hover:text-white font-semibold border rounded border-solid bg-purple-400 text-black'>
                Get Started
            </Link>
            <Link to="/" className='border rounded border-solid px-5 py-3 hover:bg-blue-400 hover:text-black font-poppins font-semibold transform-transition'>
            Leran more
            </Link>
            
        </div>

    
        <div className=''>
    <img src="https://pbs.twimg.com/media/GbR2CYzakAIelxz?format=jpg&name=medium" 
    className='mt-[100px] rounded h-[400px] w-[600px] text-black bg-black mr-28'
    alt="" />
        </div>
    </div>
  )
}

export default About
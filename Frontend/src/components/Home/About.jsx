
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { motion, useAnimation, useScroll } from 'framer-motion'
import { ChevronDown, BookOpen, Users, Edit, Star, Zap, Globe, Award, ArrowDown } from 'lucide-react'

const About = React.memo(() => {
  return (
    <>    <section className=" text-white   max-w-screen min-h-[650px] sm:min-h-[650px] lg:min-h-[550px] flex justify-center items-center">
    <div className=" container mx-auto text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-4"
      >
        Ready to Deep Dive into Learning?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl mb-8"
      >
        Explore, Learn, and Grow with Koursely
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <button onClick={() => smoothScroll('#info')} className="bg-white text-purple-900 px-6 py-3 rounded-full font-bold mr-4 hover:bg-purple-100 transition duration-300 transform hover:scale-105">
          <Link to="/signup" >
          Get Started
        </Link>
        </button>
        <button onClick={() => smoothScroll('#features')} className="border border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-purple-900 transition duration-300 transform hover:scale-105">
           <Link to="/" >
          Learn more
        </Link>
        </button>
      </motion.div>
    </div>
     
  </section>

    
    </>

  );
});

export default About;

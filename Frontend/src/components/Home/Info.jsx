import {motion,useAnimation,useScroll} from 'framer-motion';
import { ChevronDown, BookOpen, Users, Edit, Star, Zap, Globe, Award, ArrowDown } from 'lucide-react'
import { useEffect } from 'react';
export const InfoSection = () => (
    <section id="info" className="py-20 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className=" p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            <BookOpen className="text-purple-600 w-12 h-12 mb-4 border-purple-400" />
            <h2 className=" text-white text-2xl font-bold mb-4">For Educators</h2>
            <p className="text-gray-200">
              Create and publish courses at reasonable rates. Reach students worldwide and share your expertise through our intuitive platform.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className=" p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            <Users className="text-purple-600 w-12 h-12 mb-4" />
            <h2 className="text-white text-2xl font-bold mb-4">For Students</h2>
            <p className="text-gray-200">
              Purchase courses easily and start learning immediately within the app. Access a wide range of subjects taught by expert educators.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
  
export  const Features = () => (
    <section id="features" className="py-20  text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Rich Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Edit, title: "Customizable Profiles", description: "Both educators and students can edit their individual profiles." },
            { icon: BookOpen, title: "In-App Learning", description: "Access and complete courses directly within the Koursely app." },
            { icon: Star, title: "Course Reviews", description: "Students can review courses, helping others make informed decisions." },
            { icon: Zap, title: "Interactive Lessons", description: "Engage with dynamic content, quizzes, and hands-on projects." },
            { icon: Globe, title: "Global Community", description: "Connect with learners and educators from around the world." },
            { icon: Award, title: "Certificates", description: "Earn certificates upon completion of courses to showcase your skills." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-purple-900 rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105"
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
  
  export const Footer = () => (
    <footer className="text-white py-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Koursely. All rights reserved.</p>
        <p className="mt-2">Designed by Yashvardhan</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a
            href="https://github.com/Yashvardhandhondge"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition duration-300"
          >
            Github
          </a>
          <a
            href="https://x.com/yashvardhandho3"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition duration-300"
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com/yashvardhandhondge/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition duration-300"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/yashvardhan-dhondge-0b9857296/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition duration-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
  
  
export  const ScrollIndicator = () => {
    const { scrollYProgress } = useScroll()
    const arrowControls = useAnimation()
  
    useEffect(() => {
      const animateArrow = async () => {
        while (true) {
          await arrowControls.start({ y: [0, 10, 0], transition: { duration: 1.5, repeat: Infinity } })
        }
      }
      animateArrow()
    }, [arrowControls])
  
    return (
      <>
        <motion.div
          className="fixed top-0 left-0 right-0 h-2 bg-purple-600 origin-left z-50"
          style={{ scaleX: scrollYProgress }}
        />
        <motion.div
          animate={arrowControls}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
        >
          <ArrowDown className="w-8 h-8 text-purple-600" />
        </motion.div>
      </>
    )
  }
  
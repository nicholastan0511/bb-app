import React, { useEffect } from "react";
import { Link } from "react-scroll";
import { useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import aiImg1 from '../assets/ai_img_1.jpg'
import aiImg2 from '../assets/ai_img_2.jpg'

const Hero = () => {
  const location = useLocation()

  // add scroll effect when user reselects mood from the verse page
  useEffect(() => {
    // Check if the location hash exists (e.g., #section1)
    if (location.hash) {
      // Scroll to the element with the corresponding ID using React Scroll
      scroll.scrollToBottom(location.hash.slice(1), {
        duration: 800,
        smooth: 'easeInOutQuart',
      });
    } else {
      // Optionally scroll to the top of the page if no hash is provided
      scroll.scrollToTop({
        duration: 800,
        smooth: 'easeInOutQuart',
      });
    }
  }, [location])

  return (
    <section className="hero bg-base-100 min-h-screen snap-start">       
      <div className="hero-content flex-col lg:flex-row-reverse w-3/4 bg-base-200 p-20 rounded-2xl md:my-10">
      
        <label className="swap swap-flip text-5xl">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />
          <div className="swap-on">
            <img
              src={aiImg1}
              className="max-w-xs rounded-lg shadow-2xl " />
          </div>
          <div className="swap-off">
            <img
              src={aiImg2}
              className="max-w-xs rounded-lg shadow-2xl" />
          </div>
        </label>  
        <div className="flex flex-col lg:items-start sm:items-center">
          <h1 className="text-5xl font-bold sm:text-center lg:text-left">
            Discover Divine Wisdom Tailored to Your Mood
            <label className="swap swap-flip text-5xl">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />

              <div className="swap-on">⚡</div>
              <div className="swap-off">❤️‍🔥</div>
            </label>  
          </h1> 
          <p className="py-6 text-xl text-gray-400 font-thin">
            How are you feeling right now?
          </p>
          <Link to="mood-section" smooth={true} duration={500} className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </section>   
  )
}

export default Hero
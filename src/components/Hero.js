import React, { useEffect } from "react";
import { Link } from "react-scroll";
import { useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

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
    <section className="hero bg-base-100 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
          Discover Divine Wisdom Tailored to Your Mood
          <label className="swap swap-flip text-5xl">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />

          <div className="swap-on">⚡</div>
          <div className="swap-off">❤️‍🔥</div>
          </label>
          </h1>
          <p className="py-6">
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
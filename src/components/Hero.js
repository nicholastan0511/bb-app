import React, { useEffect } from 'react';
import { Link } from 'react-scroll';
import { useLocation } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import aiImg1 from '../assets/ai_img_1.jpg';
import aiImg2 from '../assets/ai_img_2.jpg';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

const Hero = () => {
  const location = useLocation();

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
  }, [location]);

  return (
    <section className="bg-base-100 w-screen min-h-screen snap-start flex justify-center">
      <div className="bg-stone-900 flex items-center sm:flex-col sm:justify-center lg:flex-row-reverse lg:justify-around p-32 gap-10 relative">
        <div className="navbar absolute top-10 z-49 flex justify-between px-20">
          <a className="btn btn-ghost lg:text-md sm:text-xl uppercase font-extrabold">
            MoodVerse
          </a>
          <div className="gap-5">
            <LoginPage />
            <SignupPage />
          </div>
        </div>
        <div>
          <label className="swap swap-flip text-5xl">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />
            <div className="swap-on">
              <img src={aiImg1} className="max-w-xs rounded-lg shadow-2xl " />
            </div>
            <div className="swap-off">
              <img src={aiImg2} className="max-w-xs rounded-lg shadow-2xl" />
            </div>
          </label>
        </div>
        <div className="flex flex-col lg:items-start sm:items-center gap-8">
          <h1 className="text-5xl font-bold sm:text-center lg:text-left text-shadow-lg">
            Discover Divine Wisdom Tailored to Your Mood
          </h1>
          <p className="py-6 text-xl text-stone-400 font-semibold sm:text-center lg:text-start">
            Welcome to MoodVerse, your personalized Bible verse generator
            tailored to your emotions. Whether you’re feeling joyful, anxious,
            motivated, or in need of comfort, MoodVerse is here to provide the
            perfect scripture to lift your spirits and guide your heart.
          </p>
          <Link
            to="mood-section"
            smooth={true}
            duration={500}
            className="btn btn-primary"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

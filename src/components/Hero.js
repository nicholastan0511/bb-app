import React from "react";
import { Link } from "react-scroll";

const Hero = () => {
  return (
    <section className="hero bg-base-200 min-h-screen">
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
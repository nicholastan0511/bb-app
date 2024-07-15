import React from "react";

const MoodSection = ({ moodList, handleClick }) => {
  return(    
    <section id="mood-section" className="transition-all duration-300 ease-linear gap-1 min-h-screen flex flex-col justify-center items-center bg-base-content">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900">Select to Generate a Verse 
            <label className="swap swap-flip text-5xl text-center">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />

            <div className="swap-on">📒</div>
            <div className="swap-off">🧠</div>
            </label>
        </h1>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-10 m-20">
        { moodList.map(mood => 
            <button className='btn btn-wide btn-lg hover:shadow-cyan-950 hover:rounded-none uppercase hover:scale-110 transition-all duration-300' key={mood} onClick={() => handleClick(mood)}>{mood}</button>)
        }
      </div>
    </section>  
  )
}

export default MoodSection
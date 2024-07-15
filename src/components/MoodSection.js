import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchOneVerse } from "../reducers/verseReducer"; 
import { useDispatch } from "react-redux";

const MoodSection = ({ moodList }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = async (mood) => {
    try {
      dispatch(fetchOneVerse(mood))
      navigate(`/verse?mood=${mood}`)
    } catch (e) {
      console.log(e)
    } 
  }


  return(    
    <section id="mood-section" className="transition-all duration-300 ease-linear min-h-screen flex flex-col justify-center items-center bg-base-content gap-20">
      <div className="bg-base-100 p-10 text-white flex items-center rounded-xl">
        <h1 className="text-5xl font-bold text-white-900">Select to Generate a Verse 
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
            <button className='btn btn-wide btn-lg hover:shadow-cyan-950 hover:rounded-none uppercase hover:scale-110 hover:bg-opacity-100 transition-all duration-300 text-2xl bg-opacity-85' key={mood.mood} onClick={() => handleClick(mood.mood)}>{mood.mood} {mood.emoji}</button>)
        }
      </div>
    </section>  
  )
}

export default MoodSection
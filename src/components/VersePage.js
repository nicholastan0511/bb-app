import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetVerse, fetchOneVerse } from "../reducers/verseReducer";
import { useLocation } from "react-router-dom";

const moodList = [
  { mood: "motivated", emoji: "💪" },
  { mood: "joyful", emoji: "😄" },
  { mood: "grateful", emoji: "🙏" },
  { mood: "peaceful", emoji: "😌" },
  { mood: "hopeful", emoji: "🌟" },
  { mood: "inspired", emoji: "🌼" },
  { mood: "content", emoji: "😊" },
  { mood: "optimistic", emoji: "😃" },
  { mood: "energetic", emoji: "🚀" },
  { mood: "blessed", emoji: "🙌" }
];

const VersePage = () => {
  const error = useSelector(state => state.error)
  const verse = useSelector(state => state.verses)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [genz , setGenZ] = useState(false)

  const mood = new URLSearchParams(location.search).get('mood')

  const moodInfo = moodList.filter(oneMood => oneMood.mood === mood)

  const handleReselect = () => {
    dispatch(resetVerse())
    navigate('/#mood-section')
  }

  const handleRefetch = () => {
    dispatch(resetVerse())
    dispatch(fetchOneVerse(mood))
  }

  const handleGetGenZ = () => {
    if (!genz)
      setGenZ(true)
  }

  
  if (error.length > 0) {
    navigate('/')
  }  

  if (verse.length === 0) {  
 
    return (
      <section className="transition-all duration-300 ease-linear gap-1 min-h-screen flex flex-col justify-center items-center bg-base-100">
        <span className="loading loading-infinity loading-lg"></span>
      </section>
    )
  }

  return (
    <section className="transition-all duration-300 ease-linear gap-10 min-h-screen flex flex-col justify-center items-center bg-base-100">
      <div className="bg-neutral p-10 text-white flex items-center rounded-xl hover:cursor-pointer" onClick={handleReselect}>
        <h1 className="text-5xl font-bold text-white-900 uppercase">
          { moodInfo[0].mood } { moodInfo[0].emoji }
        </h1>
      </div>
      <div className="collapse w-3/4">
        <input type="checkbox" className="peer" />
        <div
          className="p-8 collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content flex justify-between gap-10">
          <div className="flex flex-col justify-start gap-5 flex-grow">
            <p className="text-xl">"{verse.text}"</p>  
            <p className="italic">{verse.book} {verse.verse}</p>
          </div>
          { genz ? 
            <div className="flex flex-col justify-start gap-5 flex-grow">
              <p className="text-xl">{verse['gen-z_version']} </p> 
              <p className="italic">Gen-Z Version</p>
            </div>
            : null }
        </div>
        <div
          className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content flex justify-around gap-5">
          <button className="btn btn-primary lg:btn-wide sm:btn-sm" onClick={handleReselect}>Reselect mood</button>
          <button className="btn btn-warning lg:btn-wide text-white sm:btn-sm" onClick={handleRefetch}>Fetch another verse</button>
          <button className="btn btn-info lg:btn-wide text-white sm:btn-sm" onClick={handleGetGenZ}>Get Gen Z Version</button>
        </div>
      </div>
    </section>
  )
}

export default VersePage
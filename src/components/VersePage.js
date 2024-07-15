import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetVerse, fetchOneVerse } from "../reducers/verseReducer";
import { useLocation } from "react-router-dom";
import Error from "./Error";

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
  const mood = new URLSearchParams(location.search).get('mood')

  const moodInfo = moodList.filter(oneMood => oneMood.mood === mood)

  const handleReselect = () => {
    dispatch(resetVerse())
    navigate('/')
  }

  const handleRefetch = () => {
    dispatch(resetVerse())
    dispatch(fetchOneVerse(mood))
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
          className="p-8 collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content flex flex-col justify-start gap-5">
          <p className="text-xl">"{verse.text}"</p>  
          <p>{verse.book} {verse.verse}</p>
        </div>
        <div
          className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content flex justify-around">
          <button className="btn btn-primary btn-wide" onClick={handleReselect}>Reselect mood?</button>
          <button className="btn btn-warning btn-wide" onClick={handleRefetch}>Get another verse?</button>
        </div>
      </div>
    </section>
  )
}

export default VersePage
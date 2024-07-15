import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetVerse, fetchOneVerse } from "../reducers/verseReducer";
import { useLocation } from "react-router-dom";

const VersePage = () => {
  const verse = useSelector(state => state.verses)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const mood = new URLSearchParams(location.search).get('mood')

  const handleReselect = () => {
    dispatch(resetVerse())
    navigate('/')
  }

  const handleRefetch = () => {
    dispatch(resetVerse())
    dispatch(fetchOneVerse(mood))
  }
  
  if (verse.length === 0) {    
    return (
      <section id="mood-section" className="transition-all duration-300 ease-linear gap-1 min-h-screen flex flex-col justify-center items-center bg-base-100">
        <span className="loading loading-infinity loading-lg"></span>
      </section>
    )
  }

  return (
    <section id="mood-section" className="transition-all duration-300 ease-linear gap-1 min-h-screen flex flex-col justify-center items-center bg-base-100">
      <div className="collapse w-3/4">
        <input type="checkbox" className="peer" />
        <div
          className="p-8 collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          "{verse.text}" {verse.book} {verse.verse}
        </div>
        <div
          className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          <button className="btn btn-primary btn-wide" onClick={handleReselect}>Reselect mood?</button>
          <button className="btn btn-warning btn-wide" onClick={handleRefetch}>Get another verse?</button>
        </div>
      </div>
    </section>
  )
}

export default VersePage
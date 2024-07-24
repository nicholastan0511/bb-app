import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOneVerse } from '../reducers/verseReducer';
import { useDispatch, useSelector } from 'react-redux';

const MoodSection = ({ moodList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleClick = async (mood) => {
    try {
      dispatch(fetchOneVerse(mood));
      console.log(user);
      if (user && user.token) {
        navigate(`/dashboard/verse?mood=${mood}`);
      } else {
        navigate(`/verse?mood=${mood}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      id="mood-section"
      className="transition-all duration-300 ease-linear h-screen flex flex-col justify-center items-center bg-stone-900 gap-20 snap-start grow overflow-y-auto"
    >
      <div className="bg-base-100 bg-opacity-50 p-10 text-white flex items-center gap-5 rounded-xl mt-10 lg:mt-0">
        <h1 className="text-5xl font-bold text-white-900">
          Select to Generate a Verse
        </h1>
        <label className="swap swap-flip text-5xl text-center">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />

          <div className="swap-on">📜</div>
          <div className="swap-off">✍️</div>
        </label>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-10 2xl:max-w-screen-2xl">
        {moodList.map((mood) => (
          <button
            className="btn btn-wide btn-outline btn-secondary hover:shadow-cyan-950 capitalize hover:scale-105 hover:bg-opacity-100 transition-all duration-300 text-2xl"
            key={mood.mood}
            onClick={() => handleClick(mood.mood)}
          >
            {mood.mood} {mood.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSection;

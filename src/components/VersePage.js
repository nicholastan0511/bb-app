import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetVerse, fetchOneVerse } from '../reducers/verseReducer';
import { useLocation } from 'react-router-dom';
import verseService from '../services/verse';

const moodList = [
  { mood: 'motivated', emoji: '💪' },
  { mood: 'joyful', emoji: '😄' },
  { mood: 'grateful', emoji: '🙏' },
  { mood: 'peaceful', emoji: '😌' },
  { mood: 'hopeful', emoji: '🌟' },
  { mood: 'inspired', emoji: '🌼' },
  { mood: 'content', emoji: '😊' },
  { mood: 'optimistic', emoji: '😃' },
  { mood: 'energetic', emoji: '🚀' },
  { mood: 'blessed', emoji: '🙌' },
];

const VersePage = ({ user }) => {
  const error = useSelector((state) => state.error);
  const verse = useSelector((state) => state.verses);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const audioRef = useRef(null);
  const collapseRef = useRef(null);

  useEffect(() => {
    if (verse.length !== 0) dispatch(resetVerse());
  }, [location]);

  const [audioExist, setAudioExist] = useState(false);

  const mood = new URLSearchParams(location.search).get('mood');

  const moodInfo = moodList.filter((oneMood) => oneMood.mood === mood);

  const handleReselect = () => {
    dispatch(resetVerse());
    if (user && user.token) {
      navigate('/dashboard/versegenerator');
    } else {
      navigate('/#mood-section');
    }
  };

  const handleRefetch = (e) => {
    if (collapseRef.current) {
      collapseRef.current.focus();
    }
    dispatch(resetVerse());
    dispatch(fetchOneVerse(mood));
    setAudioExist(false);
  };

  const handleAudio = async (text) => {
    if (!audioExist) {
      const result = await verseService.getVerseAudio(text);
      const blob = new Blob([result], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
        setAudioExist(true);
      }
    } else {
      audioRef.current.play();
    }
  };

  if (error && error.type === 'serverError') {
    if (user && user.token) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }

  if (verse.length === 0) {
    return (
      <section className="w-full transition-all duration-300 ease-linear gap-1 min-h-screen flex flex-col justify-center items-center bg-stone-900">
        <span className="loading loading-infinity loading-lg"></span>
      </section>
    );
  }

  return (
    <section className="w-full transition-all duration-300 ease-linear gap-10 min-h-screen flex flex-col justify-center items-center bg-stone-900">
      <div
        className="bg-neutral p-10 text-white flex items-center rounded-xl hover:cursor-pointer"
        onClick={handleReselect}
      >
        <h1 className="text-5xl font-bold text-white-900 uppercase">
          {moodInfo[0].mood} {moodInfo[0].emoji}
        </h1>
      </div>
      <div className="collapse w-3/4">
        <input type="checkbox" className="peer" />
        <div className="p-8 collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content flex justify-between gap-10">
          <div className="flex flex-col justify-center items-center gap-5 flex-grow flex-wrap">
            <p className="text-xl text-center">{verse.text}</p>
            <div className="flex items-center gap-5">
              <p className="italic text-center">
                {verse.book} {verse.verse}
              </p>
              <span
                onClick={() => handleAudio(verse.text)}
                className="transition-all hover:bg-base-200 hover:bg-opacity-50 hover:rounded-full p-2 hover:cursor-pointer z-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
                </svg>
              </span>
              <audio ref={audioRef} />
            </div>
          </div>
        </div>
        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content peer-checked:pb-6 flex justify-around gap-5">
          <button
            className="btn btn-outline 2xl:btn-wide text-md btn-xs lg:btn-sm"
            onClick={handleReselect}
          >
            Reselect mood
          </button>
          <button
            className="btn btn-outline 2xl:btn-wide text-md btn-xs lg:btn-sm"
            onClick={handleRefetch}
          >
            Fetch another verse
          </button>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-outline 2xl:btn-wide text-md btn-xs lg:btn-sm"
            onClick={() => document.getElementById('my_modal_1').showModal()}
          >
            Get Gen-Z Version
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box w-11/12 max-w-5xl glass">
              <h3 className="font-bold text-lg">
                {verse.book} {verse.verse}
              </h3>
              <p className="py-4">{verse['gen-z_version']}</p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-outline 2xl:btn-wide text-md btn-xs lg:btn-sm"
            onClick={() => document.getElementById('my_modal_2').showModal()}
          >
            See context
          </button>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box w-11/12 max-w-5xl glass">
              <h3 className="font-bold text-lg">
                {verse.book} {verse.verse}
              </h3>
              <p className="py-4">{verse.context}</p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </section>
  );
};

export default VersePage;

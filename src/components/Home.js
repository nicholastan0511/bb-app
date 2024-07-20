import React from 'react';
import { useSelector } from 'react-redux';

// import components
import Hero from './Hero';
import MoodSection from './MoodSection';
import Error from './Error';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

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

const Home = () => {
  const error = useSelector((state) => state.error);

  return (
    <div>
      {error.length > 0 ? <Error message={error} /> : null}
      <div className="navbar bg-neutral absolute top-0 z-50 flex justify-between p-3">
        <a className="btn btn-ghost text-xl">Verse Generator</a>
        <div className="gap-5">
          <LoginPage />
          <SignupPage />
        </div>
      </div>
      <Hero />
      <MoodSection moodList={moodList} />
    </div>
  );
};

export default Home;

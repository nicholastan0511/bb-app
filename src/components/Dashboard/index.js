import React, { useEffect } from 'react';
import Navbar from './Navbar';
import AdminMenu from './AdminMenu';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MoodSection from '../MoodSection';
import VersePage from '../VersePage';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo } from '../../reducers/userStatsReducer';
import SavedVerses from './SavedVerses';
import { resetVerse } from '../../reducers/verseReducer';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const userStats = useSelector((state) => state.userStats);
  const verse = useSelector((state) => state.verses);
  const dispatch = useDispatch();

  // console.log(userStats);

  useEffect(() => {
    console.log(location.pathname, verse);
    if (verse && verse.verse) {
      console.log('im called');
      dispatch(resetVerse());
    }
  }, [location]);

  useEffect(() => {
    if (user && user.token) {
      // console.log('im called');
      dispatch(fetchUserInfo());
    }
    navigate('/dashboard/menu');
  }, []);

  return (
    <section className="w-full h-full flex">
      <Navbar user={user} />
      <Routes>
        <Route path="/menu" element={<AdminMenu userStats={userStats} />} />
        <Route
          path="/versegenerator"
          element={<MoodSection moodList={MOOD_LIST} />}
        />
        <Route
          path="/verse"
          element={<VersePage user={user} userStats={userStats} />}
        />
        <Route
          path="/saved_verses"
          element={
            <SavedVerses
              savedVerses={userStats.savedVerses}
              notes={userStats.notes}
            />
          }
        />
      </Routes>
    </section>
  );
};

export default Dashboard;

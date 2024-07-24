import React, { useEffect } from 'react';
import Navbar from './Navbar';
import AdminMenu from './AdminMenu';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MoodSection from '../MoodSection';
import VersePage from '../VersePage';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard/menu');
  }, []);

  return (
    <section className="w-full h-full flex">
      <Navbar user={user} />
      <Routes>
        <Route path="/menu" element={<AdminMenu />} />
        <Route
          path="/versegenerator"
          element={<MoodSection moodList={MOOD_LIST} />}
        />
        <Route path="/verse" element={<VersePage />} />
      </Routes>
    </section>
  );
};

export default Dashboard;

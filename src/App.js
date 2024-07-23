import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import VersePage from './components/VersePage';
import Dashboard from './components/Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from './reducers/userReducer';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // run when user signs up or logs in
  useEffect(() => {
    if (user && user.token) {
      navigate('/dashboard');
    }
  }, [user]);

  // run when page is initially rendered
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('loggedUserInfo'));
    if (userInfo) {
      dispatch(setUser(userInfo));
    }
  }, []);

  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
        <Route path="/verse" element={<VersePage />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </div>
  );
};

export default App;

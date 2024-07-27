import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Link from './Link';
import homeSvg from '../../assets/home.svg';
import savedSvg from '../../assets/saved.svg';
// import noteSvg from '../../assets/note.svg';
import bibleSvg from '../../assets/bible.svg';
import logoutSvg from '../../assets/logout.svg';
import clockSvg from '../../assets/clock.svg';

import { useDispatch } from 'react-redux';
import { signOut } from '../../reducers/userReducer';

const Navbar = ({ user }) => {
  const [active, setActive] = useState(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(signOut());
    navigate('/');
  };

  useEffect(() => {
    if (currentPath === '/dashboard/menu') setActive('menu');
    else if (currentPath === '/dashboard/versegenerator')
      setActive('versegenerator');
    else if (currentPath === '/dashboard/verse') setActive('versegenerator');
    else if (currentPath === '/dashboard/saved_verses')
      setActive('saved_verses');
    else if (currentPath === '/dashboard/history') setActive('history');
    else setActive(null);
  }, [location]);

  return (
    <div className="min-w-72 max-w-72 h-screen flex flex-col items-start pt-10 gap-10 relative grow">
      <h1 className="py-4 pl-8 w-full">MoodVerse</h1>
      <div className="flex flex-col gap-10 w-full">
        <Link
          text={'Dashboard'}
          icon={homeSvg}
          path="/dashboard/menu"
          active={active === 'menu' ? true : false}
        />
        <Link
          text={'Saved Verses'}
          icon={savedSvg}
          path="/dashboard/saved_verses"
          active={active === 'saved_verses' ? true : false}
        />
        <Link
          text={'History'}
          icon={clockSvg}
          path="/dashboard/history"
          active={active === 'history' ? true : false}
        />
        <Link
          text={'Verse Generator'}
          icon={bibleSvg}
          path="/dashboard/versegenerator"
          active={active === 'versegenerator' ? true : false}
        />
      </div>
      <div className="avatar absolute bottom-5 flex items-center justify-around gap-2 w-full">
        <div className="w-10 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
        <p className="text-lg text-stone-300">{user ? user.username : null}</p>
        <a
          className="hover:bg-stone-700 p-3 hover:cursor-pointer rounded-full"
          onClick={handleLogout}
        >
          <img src={logoutSvg} alt="logout icon" className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;

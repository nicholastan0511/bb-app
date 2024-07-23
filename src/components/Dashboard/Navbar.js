import React from 'react';
import Link from './Link';
import homeSvg from '../../assets/home.svg';
import savedSvg from '../../assets/saved.svg';
import noteSvg from '../../assets/note.svg';
import bibleSvg from '../../assets/bible.svg';

const Navbar = ({ user }) => {
  return (
    <div className="max-w-72 h-screen bg-base-100 flex flex-col items-start pt-10 gap-10 relative">
      <h1 className="p-4 w-full">MoodVerse</h1>
      <div className="flex flex-col gap-10 w-full">
        <Link text={'Dashboard'} icon={homeSvg} />
        <Link text={'Saved Verses'} icon={savedSvg} />
        <Link text={'Notes'} icon={noteSvg} />
        <Link text={'Verse Generator'} icon={bibleSvg} />
      </div>
      <div className="avatar absolute bottom-5 flex items-center justify-around gap-2 w-full">
        <div className="w-10 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
        <p className="text-lg text-stone-300">{user ? user.username : null}</p>
      </div>
    </div>
  );
};

export default Navbar;

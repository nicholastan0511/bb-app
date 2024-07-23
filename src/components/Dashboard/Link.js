import React from 'react';
import { useNavigate } from 'react-router-dom';

const Link = ({ text, icon, path, active }) => {
  const navigate = useNavigate();
  return (
    <a
      className={`${
        active
          ? 'text-white bg-stone-700 border-r-2'
          : 'hover:text-white hover:bg-stone-700 text-stone-500 hover:border-r-2'
      }  hover:cursor-pointer font-semibold duration-300 ease-in-out transition-colors w-full py-4 pl-8 flex gap-5 border-secondary`}
      onClick={() => navigate(path)}
    >
      {icon && <img src={icon} alt={`${text} icon`} className="w-5 h-5" />}
      {text}
    </a>
  );
};

export default Link;

import React from 'react';

const Link = ({ text, icon }) => {
  return (
    <a className="hover:cursor-pointer hover:text-stone-300 hover:bg-stone-700 text-stone-500 font-semibold duration-300 ease-in-out transition-colors w-full py-4 pl-8 flex gap-5 hover:border-r-2 border-secondary">
      {icon && <img src={icon} alt={`${text} icon`} className="w-5 h-5" />}
      {text}
    </a>
  );
};

export default Link;

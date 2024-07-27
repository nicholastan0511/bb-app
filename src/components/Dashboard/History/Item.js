import React from 'react';

const Item = ({ verse }) => {
  return (
    <div className="bg-base-200 p-5 rounded-xl flex flex-col gap-5 justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold">
          {verse.book} {verse.verse}
        </h1>
        <p className="text-md">{verse.text}</p>
      </div>
      <div className="flex justify-between">
        <div className="self-center btn btn-ghost bg-stone-900">
          #{verse.mood}
        </div>
      </div>
    </div>
  );
};

export default Item;

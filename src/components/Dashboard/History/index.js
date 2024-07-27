import React from 'react';
import Item from './Item';

const History = ({ history }) => {
  console.log(history);
  return (
    <div className="h-screen bg-stone-900 grow overflow-y-auto flex items-end">
      <div
        className={`border-2 border-b-0 border-stone-700 rounded-t-3xl w-full h-[97%] flex flex-col justify-start items-center p-10 gap-10`}
      >
        <h1 className="text-3xl font-semibold self-start">History</h1>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(500px,1fr))] [grid-auto-rows: 500px] gap-20 w-full">
          {history.map((verse) => (
            <Item verse={verse.verseId} key={verse._id} time={verse.time} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;

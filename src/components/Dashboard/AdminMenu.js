import React from 'react';
import Stats, { StatUser } from './StatComponent';

const AdminMenu = ({ userStats }) => {
  const savedVersesLength = userStats.savedVerses
    ? userStats.savedVerses.length
    : null;

  return (
    <div className="h-screen bg-stone-900 grow overflow-hidden flex items-end">
      <div
        className={`border-2 border-b-0 border-stone-700 rounded-t-3xl w-full h-[97%] flex flex-col justify-around items-center p-10 gap-5`}
      >
        <h1 className="text-3xl font-semibold self-start">Dashboard</h1>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(500px,1fr))] [grid-auto-rows: 380px] gap-20 w-full">
          <Stats
            title="Verse Generated Today"
            value={userStats.generatedVerseCount}
            desc="21% increase from yesterday"
          />
          <Stats
            title="Saved Verses"
            value={savedVersesLength}
            desc="21% increase from yesterday"
          />
          <Stats
            title="Verse Generated Today"
            value={0}
            desc="21% increase from yesterday"
          />
          <Stats
            title="Verse Generated Today"
            value={0}
            desc="21% increase from yesterday"
          />
        </div>
        <StatUser />
      </div>
    </div>
  );
};

export default AdminMenu;

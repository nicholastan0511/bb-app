import React, { useEffect, useState } from 'react';
import Stats, { StatUser } from './StatComponent';
import Error from '../Error';
import { useSelector } from 'react-redux';

const AdminMenu = ({ userStats }) => {
  const error = useSelector((state) => state.error);
  const [todayHistory, setTodayHistory] = useState(null);

  // get saved verses length
  const savedVersesLength = userStats.savedVerses
    ? userStats.savedVerses.length
    : null;

  // Helper function to check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getUTCFullYear() === today.getUTCFullYear() &&
      date.getUTCMonth() === today.getUTCMonth() &&
      date.getUTCDate() === today.getUTCDate()
    );
  };

  // Function to filter history for the current day
  const filterVersesForToday = (userStats) => {
    const todayHistory = userStats.history.filter((item) =>
      isToday(new Date(item.time))
    );

    return todayHistory;
  };

  // only set today's history when userStats data is available
  useEffect(() => {
    if (userStats && userStats.history) {
      setTodayHistory(filterVersesForToday(userStats));
    }
  }, [userStats]);

  return (
    <div className="h-screen bg-stone-900 grow overflow-hidden flex items-end">
      <div
        className={`border-2 border-b-0 border-stone-700 rounded-t-3xl w-full h-[97%] flex flex-col justify-around items-center p-10 gap-5 relative`}
      >
        {error && error.type === 'serverError' ? <Error error={error} /> : null}
        <h1 className="text-3xl font-semibold self-start">Dashboard</h1>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(500px,1fr))] [grid-auto-rows: 380px] gap-20 w-full">
          <Stats
            title="Verse Generated Today"
            value={todayHistory ? todayHistory.length : null}
            desc="21% increase from yesterday"
          />
          <Stats
            title="Saved Verses"
            value={savedVersesLength}
            desc="21% increase from yesterday"
          />
          <Stats title="TBF" value={0} desc="21% increase from yesterday" />
          <Stats title="TBF" value={0} desc="21% increase from yesterday" />
        </div>
        <StatUser />
      </div>
    </div>
  );
};

export default AdminMenu;

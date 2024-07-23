import React from 'react';
import Navbar from './Navbar';

const Dashboard = ({ user }) => {
  return (
    <section className="min-w-full min-h-full">
      <Navbar user={user} />
    </section>
  );
};

export default Dashboard;

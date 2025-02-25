import React from 'react';
import ThreeDChart from '../components/ThreeDChart';
import UserTable from '../components/UserTable';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ width: '100%', height: '400px' }}>
      <UserTable />
      </div>
        <ThreeDChart />
    </div>
  );
};

export default Dashboard;
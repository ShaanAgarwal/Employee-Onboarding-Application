import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import HRDashboard from './HRDashboard';
import CandidatePage from '../pages/CandidatePage';

const Dashboard = () => {
  const userRole = localStorage.getItem('userRole'); // Get the user's role from local storage

  const renderDashboardContent = () => {
    switch (userRole) {
      case 'candidate':
        return <CandidatePage />;
      case 'hr':
        return <HRDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>No dashboard available for this role.</div>;
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {renderDashboardContent()}
      <Outlet />
    </div>
  );
};

export default Dashboard;
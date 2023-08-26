import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  const userRole = localStorage.getItem('userRole'); // Get the user's role from local storage

  useEffect(() => {
    // You can add any role-specific logic or effects here
  }, [userRole]);

  const renderDashboardContent = () => {
    switch (userRole) {
      case 'candidate':
        return <CandidateDashboard />;
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

// Placeholder components for different roles
const CandidateDashboard = () => {
  return <div>Candidate Dashboard Content</div>;
};

const HRDashboard = () => {
  return <div>HR Dashboard Content</div>;
};
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <Link to="/dashboard/assignHRToCandidate" className="dashboard-link">
        Assign HR To Candidates
      </Link>
    </div>
  );
};

export default AdminDashboard;

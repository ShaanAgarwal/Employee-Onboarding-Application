import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/AdminDashboard.css";
import axios from 'axios';

const AdminDashboard = () => {

  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const email = localStorage.getItem('email');
        const response = await axios.get(`http://localhost:8080/api/admin/admin-details?email=${email}`);
        setUserDetails(response.data);
        setError(null);
      } catch (error) {
        setUserDetails(null);
        setError("User not found.");
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <div>
        {error && <p>{error}</p>}
        {userDetails && (
          <div>
            <p>Name: {userDetails.name}</p>
            <p>Email: {userDetails.email}</p>
          </div>
        )}
      </div>
      <Link to="/dashboard/assignHRToCandidate" className="dashboard-link">
        Assign HR To Candidates
      </Link>
    </div>
  );
};

export default AdminDashboard;

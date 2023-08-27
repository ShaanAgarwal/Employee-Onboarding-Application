import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateDashboard = () => {

  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const email = localStorage.getItem('email');
        const response = await axios.get(`http://localhost:8080/api/candidate/candidate-details?email=${email}`);
        setUserDetails(response.data);
        setError(null);
      } catch (error) {
        setUserDetails(null);
        setError("User not found.");
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  return (
    <div>
      {error && <p>{error}</p>}
      {userDetails && (
        <div>
          <h2>Candidate Details</h2>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
        </div>
      )}
    </div>
  );
};

export default CandidateDashboard;
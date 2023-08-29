import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateDashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

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

  const handleMarkAttempted = async (roundId) => {
    try {
      await axios.put(`http://localhost:8080/api/candidate/mark-round-attempted/${roundId}`);
      fetchUserDetails();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {userDetails && (
        <div>
          <h2>Candidate Details</h2>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>

          <h3>Interview Rounds</h3>
          {userDetails.interviewRounds.map((round, index) => {
            if (index < userDetails.currentRound) {
              return (
                <div key={round._id}>
                  <p>Round {index + 1} </p>
                  <p>Name: {round.name}</p>
                  {round.updated && (
                    <>
                      <p>Details: {round.details}</p>
                      <p>Status: {round.status}</p>
                    </>
                  )}
                  {round.updated && !round.attempted && (
                    <button onClick={() => handleMarkAttempted(round._id)}>Mark Attempted</button>
                  )}
                  {round.attempted && (
                    <p>You have already attempted this round</p>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default CandidateDashboard;
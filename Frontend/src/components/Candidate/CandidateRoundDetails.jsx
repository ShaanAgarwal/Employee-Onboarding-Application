import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Styles/RoundDetailsStyles.css";

const CandidateRoundDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/api/candidate/candidate-details?email=${email}`, {
        headers: {
          Authorization: token,
        }
      });
      setUserDetails(response.data);
      setError(null);
    } catch (error) {
      setUserDetails(null);
      setError("User not found.");
    }
  };

  const handleMarkAttempted = async (roundId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/candidate/mark-round-attempted/${roundId}`, {
        headers: {
          Authorization: token,
        }
      });
      fetchUserDetails();
    } catch (error) {
      console.error(error);
    }
  };

  const onboardingHandler = () => {
    navigate('/dashboard/Candidate/Onboarding');
  };

  return (
    <div className='candidate-details-container'>
      {error && <p>{error}</p>}
      {userDetails && (
        <div className='user-profile'>
          <div className="user-candidate-image">
            <img src={userDetails.photo} alt="" />
          </div>
          <div className="user-details">
            <p>{userDetails.name}</p>
            <p>{userDetails.email}</p>
          </div>
          <div className='interview-round-main-box'>
            {userDetails.interviewRounds.map((round, index) => {
              if (index < userDetails.currentRound) {
                return (
                  <div key={round._id} className='round-specific-box'>
                    <div className='random-box'></div>
                    <div className='round-info'>
                      <p className='interview-round-number'>Interview Round {index + 1}</p>
                      <p className='round-detail'>{round.name}</p>
                      <a href={round.details} className='round-detail evaluation'>Evaluation Link</a>
                    </div>
                    {round.updated && !round.attempted && (
                      <button onClick={() => handleMarkAttempted(round._id)}>Mark Attempted</button>
                    )}
                    <div className={`status ${round.status === 'Approved' ? 'Approved' : 'Ongoing'}`}>
                      {round.status}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          {userDetails.interviewClear && (<button onClick={onboardingHandler}>Onboarding</button>)}
        </div>
      )}
    </div>
  );
};

export default CandidateRoundDetails;
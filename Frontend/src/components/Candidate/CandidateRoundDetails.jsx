import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./Styles/RoundDetailsStyles.css";
import backendURL from '../../baseURL';

const CandidateRoundDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [candidateId, setCandidateId] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');
      const response = await axios.get(`${backendURL}/api/candidate/candidate-details?email=${email}`, {
        headers: {
          Authorization: token,
        }
      });
      setUserDetails(response.data);
      setCandidateId(response.data._id);
      setError(null);
    } catch (error) {
      setUserDetails(null);
      setError("User not found.");
    }
  };

  const handleMarkAttempted = async (roundId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${backendURL}/api/candidate/mark-round-attempted/${roundId}`, {
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

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
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
            <button className="candidate-logout-button" onClick={handleLogout}>Logout</button>
            <Link to={`/dashboard/CandidateChat/${candidateId}`}>Chat</Link>
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
                      <div className='mark-attempted'>
                        <button onClick={() => handleMarkAttempted(round._id)}>Mark Attempted</button>
                      </div>
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
          {userDetails.interviewClear && (<div className='candidate-button-container'><button className='candidate-onboarding-button' onClick={onboardingHandler}>Onboarding</button></div>)}
        </div>
      )}
    </div>
  );
};

export default CandidateRoundDetails;
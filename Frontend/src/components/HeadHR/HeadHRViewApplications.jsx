import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./HeadHRStyles/HeadHRViewApplicationsStyles.css";

import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';

const HeadHRViewApplications = () => {
  const [candidates, setCandidates] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/form/getCandidates', {
        headers: {
          Authorization: token,
        }
      });
      setCandidates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async (candidateId) => {
    try {
      const token = localStorage.getItem('token');
      dispatch(showLoading());
      await axios.post(`http://localhost:8080/api/form/accept/${candidateId}`, {
        headers: {
          Authorization: token,
        }
      });
      dispatch(hideLoading());
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (candidateId) => {
    try {
      const token = localStorage.getItem('token');
      dispatch(showLoading());
      await axios.post(`http://localhost:8080/api/form/reject/${candidateId}`, {
        headers: {
          Authorization: token,
        }
      });
      dispatch(hideLoading());
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='head-hr-view-applications-main-page'>
        <h2 className='applications-header'>Applications</h2>
        <div className='outer-padding'>
          <ul>
            {candidates.map((candidate) => (
              <li key={candidate._id}>
                <div className='candidate-photo'>
                  <img src={candidate.photoPath} alt="Candidate Photo" />
                </div>
                <div className='candidate-info'>
                  <div className="candidate-details">
                    <p className='candidate-name'>{candidate.name}</p>
                    <p className='candidate-email'>{candidate.email}</p>
                  </div>
                  <div className="candidate-submitted-details">
                    <p className='candidate-position'>Job Role: {candidate.job_role}</p>
                    <p><a href={candidate.resumePath} download>Download Resume</a></p>
                  </div>
                </div>
                <div className='buttons-container'>
                  <button className='approve' onClick={() => handleAccept(candidate._id)}>Approve</button>
                  <button className='reject' onClick={() => handleReject(candidate._id)}>Reject</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HeadHRViewApplications;
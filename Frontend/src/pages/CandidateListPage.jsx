import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateListPage = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/form/getCandidates');
      setCandidates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async (candidateId) => {
    try {
      await axios.post(`http://localhost:8080/api/form/accept/${candidateId}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (candidateId) => {
    try {
      await axios.post(`http://localhost:8080/api/form/reject/${candidateId}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const generateResumeDownloadLink = (candidateId, resumePath) => {
    const downloadUrl = `http://localhost:8080/api/form/download/${candidateId}/${encodeURIComponent(resumePath)}`;
    return downloadUrl;
  };

  return (
    <div>
      <h2>Candidate List</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate._id}>
            <p>Name: {candidate.name}</p>
            <p>Email: {candidate.email}</p>
            <p>Resume Path: <a href={generateResumeDownloadLink(candidate._id, candidate.resumePath)} download>Download Resume</a></p>
            <button onClick={() => handleAccept(candidate._id)}>Accept</button>
            <button onClick={() => handleReject(candidate._id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateListPage;

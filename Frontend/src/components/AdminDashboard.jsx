import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [hrs, setHRs] = useState([]);
  const [selectedHR, setSelectedHR] = useState('');
  const [rounds, setRounds] = useState(1);

  useEffect(() => {
    fetchCandidates();
    fetchHRs();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/getCandidates');
      setCandidates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHRs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/getHRs');
      setHRs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignHR = async (userId) => {
    try {
      await axios.post(`http://localhost:8080/api/admin/assign-hr/${userId}`, { hrId: selectedHR });
      fetchCandidates();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateRounds = async (userId) => {
    try {
      await axios.post(`http://localhost:8080/api/admin/update-rounds/${userId}`, { rounds });
      fetchCandidates();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Candidates List</h3>
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate._id}>
              <p>Name: {candidate.username}</p>
              <p>Assigned HR: {candidate.assignedHR ? candidate.assignedHR.username : 'Not Assigned'}</p>
              <p>Interview Rounds: {candidate.rounds}</p>
              <select value={selectedHR} onChange={(e) => setSelectedHR(e.target.value)}>
                <option value="">Select HR</option>
                {hrs.map((hr) => (
                  <option key={hr._id} value={hr._id}>{hr.username}</option>
                ))}
              </select>
              <button onClick={() => handleAssignHR(candidate._id)}>Assign HR</button>
              <input type="number" value={rounds} onChange={(e) => setRounds(e.target.value)} />
              <button onClick={() => handleUpdateRounds(candidate._id)}>Update Rounds</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;

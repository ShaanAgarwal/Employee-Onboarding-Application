import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./HeadHRStyles/HeadHRAssignmentStyles.css";

const HeadHRAssignment = () => {

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
        <div className='main-hr-assignment-page'>
            <div className='assignment-header'>
            <h3>Assignment</h3>
            </div>
            <ul>
                {candidates.map((candidate) => (
                    <div className="candidate-box" key={candidate._id}>
                        <div className="candidate-picture">
                            <img src={candidate.photo} alt="" />
                        </div>
                        <div className="candidate-info">
                            <p>Name: {candidate.name}</p>
                            <p>Assigned HR: {candidate.assignedHR ? candidate.assignedHR.name : 'Not Assigned'}</p>
                            <p>Interview Rounds: {candidate.rounds}</p>
                        </div>
                        <div>
                            <div className="input-container">
                                <select value={selectedHR} onChange={(e) => setSelectedHR(e.target.value)}>
                                    <option value="">Select HR</option>
                                    {hrs.map((hr) => (
                                        <option key={hr._id} value={hr._id}>{hr.name}</option>
                                    ))}
                                </select>
                                <button onClick={() => handleAssignHR(candidate._id)}>Assign HR</button>
                            </div>
                            <div className="input-container">
                                <input type="number" value={rounds} onChange={(e) => setRounds(e.target.value)} />
                                <button onClick={() => handleUpdateRounds(candidate._id)}>Update Rounds</button>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default HeadHRAssignment;
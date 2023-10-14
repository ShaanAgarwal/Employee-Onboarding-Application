import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./HeadHRStyles/ViewOngoingStyles.css";

const HeadHRViewOngoing = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/admin/get-ongoing-candidates');
            setCandidates(response.data.candidates);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='hr-view-ongoing-candidates'>
            <h2>Ongoing Candidates</h2>
            {candidates.map(candidate => (
                <div className="candidate-box" key={candidate.email}>
                    <div className="candidate-photo">
                        <img src={candidate.photo} alt="Candidate" />
                    </div>
                    <div className="candidate-info">
                        <p><strong>Name:</strong> {candidate.name}</p>
                        <p><strong>Email:</strong> {candidate.email}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HeadHRViewOngoing;
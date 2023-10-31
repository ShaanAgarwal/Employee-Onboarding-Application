import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./HeadHRStyles/HeadHRRejectedStyles.css";

const HeadHRViewRejected = () => {
    const [rejectedCandidates, setRejectedCandidates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRejectedCandidates = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/get-rejected-candidates');
                setRejectedCandidates(response.data.rejected);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching rejected candidates:', error);
                setLoading(false);
            }
        };

        fetchRejectedCandidates();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='main-page-hr-view-rejected'>
            <h2>Rejected Candidates</h2>
            {rejectedCandidates.map(candidate => (
                <div className="rejected-candidate-box" key={candidate._id}>
                    <div className='rejected-candidate-image'>
                        <img src={candidate.photo} alt={candidate.name} />
                    </div>
                    <div className="rejected-candidate-details">
                        <p><strong>Name:</strong> {candidate.name}</p>
                        <p><strong>Email:</strong> {candidate.email}</p>
                        <p><strong>Rejection Reason:</strong> {candidate.rejectionReason}</p>
                        <p><strong>Rejection Round:</strong> {candidate.rejectionRound}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HeadHRViewRejected;

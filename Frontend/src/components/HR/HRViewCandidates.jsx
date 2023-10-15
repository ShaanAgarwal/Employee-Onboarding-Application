import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HRViewCandidates = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const hrEmail = localStorage.getItem('email');
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:8080/api/hr/${hrEmail}/candidates`, {
            headers: {
                Authorization: token,
            }
        })
            .then(response => {
                setCandidates(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Candidates Assigned to You</h1>
            <ul>
                {candidates.map(candidate => (
                    <li key={candidate._id}>
                        <Link to={`/dashboard/HRViewCandidate/${candidate._id}`}>
                            {candidate.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HRViewCandidates;
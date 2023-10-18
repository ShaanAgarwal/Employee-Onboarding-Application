import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Styles/HRViewCandidatesStyles.css";

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
        <div className="view-all-candidates-main-component">
            <div className="inside-container-view-all-candidates">
                <h1>Candidate List</h1>
                <ul>
                    {candidates.map(candidate => (
                        <li key={candidate._id}>
                            <Link to={`/dashboard/HRViewCandidate/${candidate._id}`}>
                                <div className="candidate-info">
                                    <img src={candidate.photo} alt="Candidate" className="candidate-photo" />
                                    <div className="candidate-details">
                                        <p className="candidate-name">{candidate.name}</p>
                                        <p className="candidate-email">{candidate.email}</p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HRViewCandidates;

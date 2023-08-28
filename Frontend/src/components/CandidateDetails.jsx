import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CandidateDetails = () => {
    const { candidateId } = useParams();
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/hr/candidate/${candidateId}`)
            .then(response => {
                setCandidate(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [candidateId]);

    if (!candidate) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Candidate Details</h2>
            <p>Name: {candidate.name}</p>
            <p>Email: {candidate.email}</p>
        </div>
    );
};

export default CandidateDetails;

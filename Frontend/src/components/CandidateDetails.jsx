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

    const handleRoundNameUpdate = async (roundId, updatedName) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/hr/round/${roundId}`, { name: updatedName });
            setCandidate(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!candidate) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Candidate Details</h2>
            <p>Name: {candidate.name}</p>
            <p>Email: {candidate.email}</p>
            <p>Current Round: {candidate.currentRound}</p>

            <h3>Interview Rounds</h3>
            {candidate.interviewRounds.map(round => (
                <div key={round._id}>
                    <p>Round Name: {round.name}</p>
                    <input
                        type="text"
                        value={round.name}
                        onChange={e => handleRoundNameUpdate(round._id, e.target.value)}
                    />
                    <button onClick={() => handleRoundNameUpdate(round._id, round.name)}>Update</button>
                </div>
            ))}
        </div>
    );
};

export default CandidateDetails;

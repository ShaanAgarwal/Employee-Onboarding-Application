import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const HRViewCandidate = () => {
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [detailsInput, setDetailsInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/hr/candidate/${candidateId}`)
      .then(response => {
        setCandidate(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [candidateId]);

  const handleUpdateRound = async (roundId) => {
    try {
      const updatedData = { name: nameInput, details: detailsInput };
      await axios.put(`http://localhost:8080/api/hr/round/${roundId}`, updatedData);
      const response = await axios.get(`http://localhost:8080/api/hr/candidate/${candidateId}`);
      setCandidate(response.data);
      setNameInput("");
      setDetailsInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptRound = async (roundId) => {
    try {
      await axios.put(`http://localhost:8080/api/hr/round/${roundId}/accept`);
      setCandidate(prevCandidate => ({
        ...prevCandidate,
        currentRound: prevCandidate.currentRound + 1,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectRound = async (roundId) => {
    try {
      await axios.put(`http://localhost:8080/api/hr/round/${roundId}/reject`);
      navigate('/dashboard');
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
      <p>Number Of Rounds: {candidate.rounds}</p>

      <h3>Interview Rounds</h3>
      {candidate.interviewRounds.map((round, index) => (
        <div key={round._id}>
          <p>Round {index + 1} </p>
          <p>Name: {round.name} </p>
          <p>Details: {round.details}</p>
          {index === candidate.currentRound - 1 && (
            <>
              <form>
                <input
                  type="text"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                />
                <input
                  type="text"
                  value={detailsInput}
                  onChange={e => setDetailsInput(e.target.value)}
                />
                <button type="button" onClick={() => handleUpdateRound(round._id)}>Update</button>
              </form>
              {round.attempted && (
                <>
                  <button onClick={() => handleAcceptRound(round._id)}>Accept</button>
                  <button onClick={() => handleRejectRound(round._id)}>Reject</button>
                </>
              )}
            </>
          )}
        </div>
      ))}
      {candidate.interviewClear && (
        <button>Onboarding Process</button>
      )}
    </div>
  );
};

export default HRViewCandidate;
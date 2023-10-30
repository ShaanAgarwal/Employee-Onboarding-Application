import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Styles/CandidateDetailsStyles.css";

const HRViewCandidate = () => {
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [detailsInput, setDetailsInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8080/api/hr/candidate/${candidateId}`, {
      headers: {
        Authorization: token,
      }
    })
      .then(response => {
        setCandidate(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [candidateId]);

  const handleUpdateRound = async (roundId) => {
    try {
      const token = localStorage.getItem('token');
      const updatedData = { name: nameInput, details: detailsInput };
      await axios.put(`http://localhost:8080/api/hr/round/${roundId}`, updatedData, {
        headers: {
          Authorization: token,
        }
      });
      const response = await axios.get(`http://localhost:8080/api/hr/candidate/${candidateId}`, {
        headers: {
          Authorization: token,
        }
      });
      setCandidate(response.data);
      setNameInput("");
      setDetailsInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptRound = async (roundId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/hr/round/${roundId}/accept`, {
        headers: {
          Authorization: token,
        }
      });
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
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/hr/round/${roundId}/reject`, {
        headers: {
          Authorization: token,
        }
      });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  if (!candidate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hr-candidate-main">
      <div className="main-box-inside">
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
        {candidate.interviewClear == true && (<Link to={`/dashboard/HRViewCandidates/${candidate._id}/PersonalDetails`}>Onboarding</Link>)}
      </div>
    </div>
  );
};

export default HRViewCandidate;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateProfile = () => {

  const [userPersonalDetails, setUserPersonalDetails] = useState(null);

  useEffect(() => {
    fetchUserPersonalDetails();
  }, []);

  const fetchUserPersonalDetails = async () => {
    try {
      const email = localStorage.getItem('email');
      const response = await axios.get(
        `http://localhost:8080/api/candidate/candidate-details?email=${email}`,
        { token: localStorage.getItem('token') },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
          },
        });
      setUserPersonalDetails(response.data);
      console.log(response.data);
    } catch (error) {
      setUserPersonalDetails(null);
    }
  };

  return (
    <>
      <h2>Candidate Details</h2>
      <p>Name: {userPersonalDetails.name}</p>
      <p>Email: {userPersonalDetails.email}</p>
    </>
  );
};

export default CandidateProfile;
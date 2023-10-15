import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateProfile = () => {

  const [userPersonalDetails, setUserPersonalDetails] = useState(null);

  useEffect(() => {
    // fetchUserPersonalDetails();
  }, []);

  const fetchUserPersonalDetails = async () => {
    try {
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');
      const passedToken = token.toString(); // Convert token to string if necessary
      console.log("Email:", email);
      console.log("Token:", passedToken);

      const response = await axios.get(
        `http://localhost:8080/api/candidate/candidate-details?email=${email}&token=${passedToken}`
      );
      setUserPersonalDetails(response.data);
      console.log(response.data);
    } catch (error) {
      setUserPersonalDetails(null);
      console.error(error); // Log the error for debugging
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
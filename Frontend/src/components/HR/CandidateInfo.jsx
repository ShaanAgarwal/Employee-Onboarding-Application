import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export const CandidateInfo = () => {
    const { candidateId } = useParams();
    const [candidateDetails, setCandidateDetails] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:8080/api/onboarding/get-personal-details/${candidateId}?nocache=${new Date().getTime()}`, {
            headers: {
                Authorization: token,
            }
        })

            .then(response => {
                setCandidateDetails(response.data.personalDetails[0]);
            })
            .catch(error => {
                console.error(error);
            });
    }, [candidateId]);

    if (!candidateDetails) {
        return <div>Loading...</div>;
    }

    const { firstName, lastName, email, phone, homeAddress, city, state, zipcode, jobRole, dob, gender, bloodGroup, maritalStatus, aadharCardNumber, postalAddress } = candidateDetails.personalDetailsForm;
    return (
        <>
            <div className='details-container'>
                <h2>Candidate Details</h2>
                <h2>dfdf</h2>
                <p>Name: {firstName} {lastName}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
                <p>Address: {homeAddress}, {city}, {state}, {zipcode}</p>
                <p>Job Role: {jobRole}</p>
                <p>Date of Birth: {dob}</p>
                <p>Gender: {gender}</p>
                <p>Blood Group: {bloodGroup}</p>
                <p>Marital Status: {maritalStatus}</p>
                <p>Aadhar Card Number: {aadharCardNumber}</p>
                <p>Postal Address: {postalAddress}</p>
                <h1>dfdk</h1>
            </div>
            <Link to={`/dashboard/HRViewCandidates/${candidateId}/VerificationDocuments`}>Verification Documents</Link>
        </>
    )
}

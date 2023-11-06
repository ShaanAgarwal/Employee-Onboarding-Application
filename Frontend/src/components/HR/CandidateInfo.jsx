import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../HR/Styles/CandidateInfo.css';

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
        <div className='main-detail-container'>
            <div className='details-wrapper'>
                <h2 >Candidate Details</h2>
                <div className='details'>
                    <p>Name: {firstName} {lastName}</p>
                    <hr style={{ width: "800px" }}></hr>
                    <p>Email: {email}</p>
                    <hr></hr>
                    <p>Phone: {phone}</p>
                    <hr></hr>
                    <p>Address: {homeAddress}, {city}, {state}, {zipcode}</p>
                    <hr></hr>
                    <p>Job Role: {jobRole}</p>
                    <hr></hr>
                    <p>Date of Birth: {dob}</p>
                    <hr></hr>
                    <p>Gender: {gender}</p>
                    <hr></hr>
                    <p>Blood Group: {bloodGroup}</p>
                    <hr></hr>
                    <p>Marital Status: {maritalStatus}</p>
                    <hr></hr>
                    <p>Aadhar Card Number: {aadharCardNumber}</p>
                    <hr></hr>
                    <p>Postal Address: {postalAddress}</p>

                </div>
                <button className='verify-button' style={{ marginBottom: "1.5rem" }}> <Link className='link' to={`/dashboard/HRViewCandidates/${candidateId}/VerificationDocuments`}>Verify Documents</Link></button>

            </div>
        </div>


    )
}

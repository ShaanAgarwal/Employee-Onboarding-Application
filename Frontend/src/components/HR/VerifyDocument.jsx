import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../HR/Styles/VerifyDocument.css';
import backendURL from '../../baseURL';

export const VerifyDocument = () => {
    const { candidateId } = useParams();
    const [candidateDetails, setCandidateDetails] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${backendURL}/api/onboarding/get-personal-details/${candidateId}`, {
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

    const handleLogout = () => {};

    const { aadharCard, graduationMarksheet, hscMarksheet, panCard, passport, residentialProof, sscMarksheet } = candidateDetails.uploadDocuments;
    return (
        <div className='main-detail-container'>
            <button className='new-logout' onClick={handleLogout}>Logout</button>
            <div className='details-wrapper'>
                <h2>Verification of Documents</h2>
                <div className='details'>

                    <a href={aadharCard}>Aadhar Card</a>
                    <hr className="hr" style={{ width: "800px" }}></hr>
                    <a href={graduationMarksheet}>Graduation Marksheet</a>
                    <hr className="hr" style={{ width: "800px" }}></hr>
                    <a href={hscMarksheet}>HSC Marksheet</a>
                    <hr className="hr" style={{ width: "800px" }}></hr>
                    <a href={panCard}>Pan Card</a>
                    <hr className="hr" style={{ width: "800px" }}></hr>
                    <a href={passport}>Passport</a>
                    <hr className="hr" style={{ width: "800px" }}></hr>
                    <a href={residentialProof}>Residential Proof</a>
                    <hr className="hr" style={{ width: "800px" }}></hr>
                    <a href={sscMarksheet}>SSC Markhseet</a>
                    <hr className="hr" style={{ width: "800px" }}></hr>
                </div>
                <button className='verify-button' style={{ marginBottom: "1.5rem" }}> <Link className='link' to={`/dashboard/HRViewCandidates/${candidateId}/OfferLetter`}>Offer Letter</Link></button>
            </div>
        </div>


    )
}

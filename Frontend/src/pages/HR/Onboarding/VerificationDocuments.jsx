import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const VerificationDocuments = () => {

    const { candidateId } = useParams();
    const [candidateDetails, setCandidateDetails] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:8080/api/onboarding/get-personal-details/${candidateId}`, {
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

    const { aadharCard, graduationMarksheet, hscMarksheet, panCard, passport, residentialProof, sscMarksheet } = candidateDetails.uploadDocuments;

    return (
        <>
            <div>VerificationDocuments</div>
            <ul>
                <li><a href={aadharCard}>Aadhar Card</a></li>
                <li><a href={graduationMarksheet}>Graduation Marksheet</a></li>
                <li><a href={hscMarksheet}>HSC Marksheet</a></li>
                <li><a href={panCard}>Pan Card</a></li>
                <li><a href={passport}>Passport</a></li>
                <li><a href={residentialProof}>Residential Proof</a></li>
                <li><a href={sscMarksheet}>SSC Markhseet</a></li>
            </ul>
            <Link to={`/dashboard/HRViewCandidates/${candidateId}/OfferLetter`}>Offer Letter</Link>
        </>
    );
};

export default VerificationDocuments;
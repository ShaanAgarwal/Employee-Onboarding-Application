import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonalDetails from "../Candidate/Candidate-Onboarding/PersonalDetails";
import OfferLetter from "../Candidate/Candidate-Onboarding/OfferLetter";
import Documents from './Candidate-Onboarding/Documents';
import backendURL from '../../baseURL';

const CandidateOnboarding = () => {

    const [candidateDetails, setCandidateDetails] = useState(null);

    const fetchOnboardingDetails = async () => {
        try {
            const email = localStorage.getItem('email');
            const token = localStorage.getItem('token');
            const response = await axios.get(`${backendURL}/api/onboarding/check-details?email=${email}`, {
                headers: {
                    Authorization: token,
                }
            });
            setCandidateDetails(response.data);
        } catch (error) {
            setCandidateDetails(null);
            console.log(error);
        }
    };


    useEffect(() => {
        fetchOnboardingDetails();
    }, []);

    const renderOnboardingComponent = () => {
        if (candidateDetails) {
            const { personalDetailsForm, uploadDocuments } = candidateDetails.onboardingDetails;

            if (!personalDetailsForm.filled) {
                return <PersonalDetails />;
            } else if (!uploadDocuments.filled) {
                return <Documents />;
            } else {
                return <OfferLetter />;
            }
        }

        return <div>Loading...</div>;
    };

    return (
        <div>
            {renderOnboardingComponent()}
        </div>
    );
};

export default CandidateOnboarding
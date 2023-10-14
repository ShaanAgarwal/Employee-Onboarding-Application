import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonalDetails from "../Candidate/Candidate-Onboarding/PersonalDetails";
import OfferLetter from "../Candidate/Candidate-Onboarding/OfferLetter";
import Documents from './Candidate-Onboarding/Documents';

const CandidateOnboarding = () => {

    const [candidateDetails, setCandidateDetails] = useState(null);

    const fetchOnboardingDetails = async () => {
        try {
            const email = localStorage.getItem('email');
            const response = await axios.get(`http://localhost:8080/api/onboarding/check-details?email=${email}`);
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

        // Handle loading state or other scenarios where candidateDetails is not available yet
        return <div>Loading...</div>;
    };

    return (
        <div>
            <h1>Candidate Onboarding</h1>
            {renderOnboardingComponent()}
        </div>
    );
};

export default CandidateOnboarding
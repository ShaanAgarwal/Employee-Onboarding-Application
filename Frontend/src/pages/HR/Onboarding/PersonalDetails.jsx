import React from 'react';
import "../Onboarding/PersonalDetails.css";
import HRComponents from '../../../components/HR/HRComponents';
import HRProfile from '../../../components/HR/HRProfile';
import { CandidateInfo } from '../../../components/HR/CandidateInfo';

const PersonalDetails = () => {


    return (
        <>
            <HRComponents />
            <HRProfile />
            <CandidateInfo />
        </>
    );
};

export default PersonalDetails;
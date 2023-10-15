import React from 'react';
import CandidateRoundDetails from '../../components/Candidate/CandidateRoundDetails';
import "./Styles/RoundDetailsStyles.css";
import logo from "../../components/HeadHR/images/logo.png";

const CandidateViewRoundDetailsPage = () => {
    return (
        <>
        <div className='candidate-round-page-main'>
            <div className='top-background-linear'>
                <img className="" alt="Company-Logo" src={logo} />
            </div>
        <CandidateRoundDetails />
        </div>
        </>
    );
};

export default CandidateViewRoundDetailsPage;
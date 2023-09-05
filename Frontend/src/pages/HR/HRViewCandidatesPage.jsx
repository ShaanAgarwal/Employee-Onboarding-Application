import React from 'react';
import HRViewCandidates from '../../components/HR/HRViewCandidates';
import HRComponents from '../../components/HR/HRComponents';
import HRProfile from '../../components/HR/HRProfile';

const HRViewCandidatesPage = () => {
    return (
        <>
            <HRComponents />
            <HRProfile />
            <HRViewCandidates />
        </>
    );
};

export default HRViewCandidatesPage;
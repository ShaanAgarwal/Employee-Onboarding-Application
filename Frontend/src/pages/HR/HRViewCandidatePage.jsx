import React from 'react';
import HRComponents from '../../components/HR/HRComponents';
import HRProfile from '../../components/HR/HRProfile';
import HRViewCandidate from '../../components/HR/CandidateDetails';

const HRViewCandidatePage = () => {
  return (
    <>
      <HRComponents />
      <HRProfile />
      <HRViewCandidate />
    </>
  );
};

export default HRViewCandidatePage;
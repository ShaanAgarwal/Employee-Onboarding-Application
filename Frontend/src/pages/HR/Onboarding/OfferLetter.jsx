import React, { useState } from 'react';

import HRProfile from '../../../components/HR/HRProfile';
import HRComponents from '../../../components/HR/HRComponents';
import OfferLetterForm from '../../../components/HR/OfferLetterForm';

const OfferLetter = () => {
    return (
        <>
            <HRComponents />
            <HRProfile />
            <OfferLetterForm />
        </>
    );
};

export default OfferLetter;
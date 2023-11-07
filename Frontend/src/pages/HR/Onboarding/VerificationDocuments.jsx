import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import HRProfile from '../../../components/HR/HRProfile';
import HRComponents from '../../../components/HR/HRComponents';
import { VerifyDocument } from '../../../components/HR/VerifyDocument';

const VerificationDocuments = () => {
    return (
        <>
            <HRProfile />
            <HRComponents />
            <VerifyDocument />
        </>
    );
};

export default VerificationDocuments;
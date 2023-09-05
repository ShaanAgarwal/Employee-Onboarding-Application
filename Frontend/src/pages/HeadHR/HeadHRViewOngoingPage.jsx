import React from 'react';
import HeadHRViewOngoing from "../../components/HeadHR/HeadHRViewOngoing";
import HeadHRComponents from '../../components/HeadHR/HeadHRComponents';
import HeadHRProfile from '../../components/HeadHR/HeadHRProfile';

const HeadHRViewOngoingPage = () => {
    return (
        <>
            <HeadHRComponents />
            <HeadHRProfile />
            <HeadHRViewOngoing />
        </>
    );
};

export default HeadHRViewOngoingPage;
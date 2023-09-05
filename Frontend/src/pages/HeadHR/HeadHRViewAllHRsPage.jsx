import React from 'react';
import HeadHRViewAllHRs from '../../components/HeadHR/HeadHRViewAllHRs';
import HeadHRComponents from '../../components/HeadHR/HeadHRComponents';
import HeadHRProfile from '../../components/HeadHR/HeadHRProfile';

const HeadHRViewAllHRsPage = () => {
    return (
        <>
            <HeadHRComponents />
            <HeadHRProfile />
            <HeadHRViewAllHRs />
        </>
    );
};

export default HeadHRViewAllHRsPage;
import React from 'react';
import { Link } from 'react-router-dom';

const HeadHRComponents = () => {
    return (
        <>
            <Link to="/dashboard/headHRViewAllHRs">View All HRs</Link>
            <Link to="/dashboard/headHRAssignment">Assignment</Link>
            <Link to="/dashboard/headHRViewOngoing">Ongoing</Link>
            <Link to="/dashboard/headHRViewRejected">Rejected</Link>
            <Link to="/dashboard/headHRRegisterHR">Register HR</Link>
            <Link to="/dashboard/headHRViewApplications">Applications</Link>
        </>
    );
};

export default HeadHRComponents;
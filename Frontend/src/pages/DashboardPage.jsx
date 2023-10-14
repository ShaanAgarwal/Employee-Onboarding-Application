import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CandidatePage from './Candidate/CandidateBasePage';

const DashboardPage = () => {
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole === 'admin') {
      navigate('/dashboard/headHRViewAllHRs');
    } else if (userRole === 'hr') {
      navigate('/dashboard/HRViewCandidates');
    } else if (userRole === 'candidate') {
      navigate('/dashboard/Candidate/ViewRoundDetails');
    };
  }, [userRole, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DashboardPage;
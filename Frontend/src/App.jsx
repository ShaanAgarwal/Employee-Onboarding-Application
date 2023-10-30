{/* Imports */ }
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

{/* Application */ }
import ApplicationPage from './pages/Application/ApplicationPage';
import ApplicationResponse from './pages/Application/ApplicationResponse';

{/* Home Page */ }
import HomePage from './pages/HomePage/HomePage';

{/* Login Page */ }
import LoginPage from './pages/Login/LoginPage';

{/* Dashboard Page */ }
import DashboardPage from './pages/DashboardPage';

{/* Register Page */ }
import RegisterPage from './pages/RegisterPage';

{/* Head HR*/ }
import HeadHRViewAllHRsPage from './pages/HeadHR/HeadHRViewAllHRsPage';
import HeadHRAssignmentPage from './pages/HeadHR/HeadHRAssignmentPage';
import HeadHRViewOngoingPage from './pages/HeadHR/HeadHRViewOngoingPage';
import HeadHRViewRejectedPage from './pages/HeadHR/HeadHRViewRejectedPage';
import HeadHRRegisterHRPage from './pages/HeadHR/HeadHRRegisterHRPage';
import HeadHRViewApplicationsPage from './pages/HeadHR/HeadHRViewApplicationsPage';

{/* HR */ }
import HRViewCandidatesPage from './pages/HR/HRViewCandidatesPage';
import HRViewCandidatePage from './pages/HR/HRViewCandidatePage';
import PersonalDetails from './pages/HR/Onboarding/PersonalDetails';
import OfferLetter from './pages/HR/Onboarding/OfferLetter';
import VerificationDocuments from './pages/HR/Onboarding/VerificationDocuments';

{/* Candidate */ }
import CandidateBasePage from './pages/Candidate/CandidateBasePage';
import CandidateOnboarding from './pages/Candidate/CandidateOnboarding';

import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";

function App() {

  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      <BrowserRouter>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          {/* HomePage */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Application */}
          <Route path="/applyForJob" element={<ApplicationPage />} />
          <Route path="/applicationResponse" element={<ApplicationResponse />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Head HR */}
          <Route path='/dashboard/headHRViewAllHRs' element={<HeadHRViewAllHRsPage />} />
          <Route path='/dashboard/headHRAssignment' element={<HeadHRAssignmentPage />} />
          <Route path='/dashboard/headHRViewOngoing' element={<HeadHRViewOngoingPage />} />
          <Route path='/dashboard/headHRViewRejected' element={<HeadHRViewRejectedPage />} />
          <Route path='/dashboard/headHRRegisterHR' element={<HeadHRRegisterHRPage />} />
          <Route path='/dashboard/headHRViewApplications' element={<HeadHRViewApplicationsPage />} />

          {/* HR */}
          <Route path='/dashboard/HRViewCandidates' element={<HRViewCandidatesPage />} />
          <Route path="/dashboard/HRViewCandidate/:candidateId" element={<HRViewCandidatePage />} />
          <Route path='/dashboard/HRViewCandidates/:candidateId/PersonalDetails' element={<PersonalDetails />} />
          <Route path='/dashboard/HRViewCandidates/:candidateId/VerificationDocuments' element={<VerificationDocuments />} />
          <Route path='/dashboard/HRViewCandidates/:candidateId/OfferLetter' element={<OfferLetter />} />

          {/* Candidates */}
          <Route path='/dashboard/Candidate/ViewRoundDetails' element={<CandidateBasePage />} />
          <Route path='/dashboard/Candidate/Onboarding' element={<CandidateOnboarding />} />

        </Routes>
      )}
      </BrowserRouter>
    </>
  )
}

export default App

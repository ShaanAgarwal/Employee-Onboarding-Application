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

{/* Candidate */ }
import CandidateBasePage from './pages/Candidate/CandidateBasePage';

function App() {

  return (
    <>
      <BrowserRouter>
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

          {/* Candidates */}
          <Route path='/dashboard/Candidate/ViewRoundDetails' element={<CandidateBasePage />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

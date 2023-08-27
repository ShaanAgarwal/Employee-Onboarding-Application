import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CandidateListPage from './pages/CandidateListPage';
import Dashboard from "./components/Dashboard";
import ApplicationPage from './pages/ApplicationPage';
import ApplicationResponse from './pages/ApplicationResponse';
import RegisterPage from './pages/RegisterPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/application" element={<ApplicationPage />} />
          <Route path="/applicationresponse" element={<ApplicationResponse />} />
          <Route path="/candidates" element={<CandidateListPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import './App.css'
import HomePage from './pages/HomePage'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CandidateListPage from './pages/CandidateListPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/candidates" element={<CandidateListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CandidateDashboard from '../components/CandidateDashboard';

function CandidatePage() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [requiresPasswordChange, setRequiresPasswordChange] = useState(false);

    useEffect(() => {
        checkPasswordChangeRequired();
    }, []);

    const checkPasswordChangeRequired = async () => {
        try {
            const email = localStorage.getItem('email');
            const response = await axios.get(`http://localhost:8080/api/candidate/check-password-change/${email}`);
            setRequiresPasswordChange(response.data.requiresPasswordChange);
        } catch (error) {
            console.error(error);
        };
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('email');
        try {
            const response = await axios.post('http://localhost:8080/api/candidate/first-login-change-password', {
                email,
                password
            });
            setMessage(response.data.message);
            setRequiresPasswordChange(false);
        } catch (error) {
            setMessage('Password change failed');
            console.error(error);
        };
    };

    return (
        <div>
            <h2>Candidate Dashboard</h2>
            {requiresPasswordChange ? (
                <div>
                    <h3>Change Password on First Login</h3>
                    <form onSubmit={handlePasswordChange}>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Change Password</button>
                    </form>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <CandidateDashboard />
                </div>
            )}
        </div>
    );
}

export default CandidatePage;
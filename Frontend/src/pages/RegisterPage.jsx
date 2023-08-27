import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('hr');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password, role);

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                name,
                email,
                password,
                role
            });
            navigate("/");
            console.log(response.data); // Handle success response
        } catch (error) {
            console.error(error); // Handle error
        }
    };

    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <select value={role} onChange={(e) => { console.log(e.target.value); setRole(e.target.value); }}>
                    <option value="hr">HR</option>
                    <option value="candidate">Candidate</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;

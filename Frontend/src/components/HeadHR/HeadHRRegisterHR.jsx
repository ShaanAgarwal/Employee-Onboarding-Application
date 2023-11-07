import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backendURL from '../../baseURL';
import '../HeadHR/HeadHRStyles/HeadHRRegisterHRStyles.css';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('hr');
    const [photo, setPhoto] = useState(null);

    const navigate = useNavigate();
    const handleFileChange = (e) => {
        const fieldName = e.target.name;
        const file = e.target.files[0];
        if (fieldName === 'photo') {
            setPhoto(file);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password, role, photo);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', role);
        formData.append('photo', photo);
        try {
            const response = await axios.post(`${backendURL}/api/auth/register`, formData);
            navigate("/");
            console.log(response.data);
            console.log(formData.get('photo'))
            console.log(formData.get('name'))
            console.log(formData)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='register-main'>
            <div className='register-main-wrapper'>
                <h1>Register Page</h1>
                <form onSubmit={handleSubmit} className='register-form'>
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
                    <input type="file" name="photo" onChange={handleFileChange} />

                    <button type="submit">Register</button>
                </form>

            </div>
        </div>
    );
};

export default RegisterPage;
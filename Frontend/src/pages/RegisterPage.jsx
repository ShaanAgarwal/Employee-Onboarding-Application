import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('hr');
    const [photo, setPhoto] = useState(null);

    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }

    const handleFileChange = (e) => {
        const fieldName = e.target.name;
        const file = e.target.files[0];

        if (fieldName === 'photo') {
            setPhoto(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', role);
        formData.append('photo', photo);

        console.log(formData.get('name'));
        console.log(formData.get('email'));
        console.log(formData.get('password'));
        console.log(formData.get('role'));
        console.log(formData.get('photo'));

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            // navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
                <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                <input type="file" name='photo' onChange={handleFileChange} />
                <select value={role} onChange={handleRoleChange}>
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

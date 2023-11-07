import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./LoginPageStyles.css";
import companyLogo from "./Empowerin-Logo.png";
import Abstraction from "./Abstraction.png";
import Key from "./key1.png";
import Mail from "./mail1.png";
import backendURL from '../../baseURL';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/auth/login`, {
        email,
        password,
      });
      if (response.data.role) {
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        console.log("Login Failed. Please Try Again");
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='login-page-main'>
      <div className="company-logo">
        <img src={companyLogo} alt="Empower Logo" />
      </div>
      <div className='main-form-layout'>
        <h2 className='login-name-header'>LOG IN</h2> <br />
        <img className="mail" src={Mail} />
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <img className="key" src={Key} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
        <button className="button-login" onClick={handleLogin}>Login</button>
      </div>
      <div className="abstraction-logo">
        <img src={Abstraction} alt="Abstraction Logo" />
      </div>
    </div>
  );
};

export default LoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./LoginPage.css";
import Logo from "./login-img.png";
import Comlogo from "./Logo.png";
import Key from "./key.svg";
import Mail from "./envelop.svg";
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
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
    <div className="log-in">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="rectangle" />
          <div className="group">
            <div className="text-wrapper">LOG IN</div>
            <div className="div">
              <div className="overlap-group">
                <div className="email-address">
                  <img className="line" alt="Line" src="line-2.svg" />
                  <div className="text-wrapper-2">Email Address</div>
                </div>
                <img className="mail" alt="Mail" src={Mail} />
                <div className="password">
                  <img className="key" alt="Mail" src={Key} />
                  <div className="text-wrapper-2">Password</div>

                </div>

              </div>

            </div>
            <div className="create-account">
              <div className="overlap-2">
                <div className="rectangle-2" />
                <div className="text-wrapper-3">LOG IN</div>
              </div>
            </div>
          </div>
          <img className="abstraction" alt="Abstraction" src={Logo} />
          <img className="botanix" alt="Botanix" src={Comlogo} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
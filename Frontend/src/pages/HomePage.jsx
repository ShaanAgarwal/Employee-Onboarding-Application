import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/HomePageStyles.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <Link className="button apply-button" to="/application">
        Apply
      </Link>
      <Link className="button register-button" to="/login">
        Login
      </Link>
    </div>
  );
};

export default HomePage;
import React from 'react';
import { Link } from 'react-router-dom';
import "./HomePageStyles.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <Link className="button apply-button" to="/applyForJob">
        Apply
      </Link>
      <Link className="button register-button" to="/login">
        Login
      </Link>
    </div>
  );
};

export default HomePage;
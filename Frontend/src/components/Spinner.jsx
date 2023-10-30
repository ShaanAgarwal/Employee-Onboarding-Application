import React from 'react';
import './Spinner.css'; // Import the CSS file

const Spinner = () => {
    return (
        <div className="d-flex justify-content-center spinner-container">
            <div className="spinner-circle"></div>
        </div>
    );
};

export default Spinner;

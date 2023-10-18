import React from 'react';
import "./Styles/HRComponentStyles.css";
import companyLogo from "./company-logo.png";
import profileSideImage from "./profile-side-image.png";

const HRComponents = () => {
    return (
        <>
            <div className='hr-component'>
                <img className='company-logo' src={companyLogo} alt="" />
                <img className='profile-side-image' src={profileSideImage} alt="" />
            </div>
        </>
    );
};

export default HRComponents;
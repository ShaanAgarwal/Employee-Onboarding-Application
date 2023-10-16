import React from 'react'
import { Link } from 'react-router-dom';
import "./ApplicationResponseStyles.css";
import CompanyLogo from "./Empowerin-Logo.png";
import ResponseCentralLogo from "./Application-Page-Response-Central-Logo.png";
import globeLogo from "./globe.png";
import facebookLogo from "./facebook-logo.png";
import gmailLogo from "./gmail-logo.png";
import instagramLogo from "./instagram-logo.png";

const ApplicationResponse = () => {
    return (
        <>
            <div className='main-application-response-page'>
                <div className='middle-portion'>
                    <div className='good-luck'>
                        <p>Good luck with the interviews</p>
                    </div>
                    <div className='contains-homepage-button'>
                        <Link to="/" className=''><p>BACK TO HOMEPAGE</p></Link>
                    </div>
                </div>
                <div className="central-logo">
                    <img src={ResponseCentralLogo} alt="Response Central Logo" />
                    <h1>Thanks for applying at our portal!</h1>
                </div>
                <div className='top-portion'>
                    <div>
                        <img className='company-logo' src={CompanyLogo} alt="Company Logo" />
                    </div>
                </div>
                <div className='bottom-portion'>
                    <img className="globe" src={globeLogo} alt="" />
                    <p>INDIA</p>
                    <img className="facebook-logo" src={facebookLogo} alt="" />
                    <img className="gmail-logo" src={gmailLogo} alt="" />
                    <img className="instagram-logo" src={instagramLogo} alt="" />
                </div>
            </div>
        </>
    );
};

export default ApplicationResponse;
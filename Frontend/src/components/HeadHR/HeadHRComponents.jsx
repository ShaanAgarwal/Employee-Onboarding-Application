import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../HeadHR/images/logo.png";
import "./HeadHRStyles/HeadHRComponents.css";

const HeadHRComponents = () => {
    return (
        <div className="head-HR-menu">
            <img className="botanix" alt="Botanix" src={logo} />
            <div className="menu-name">
                <div className="text-wrapper side">
                    <Link to="/dashboard/headHRViewOngoing" className='link-decoration'>Ongoing</Link>
                </div>
                <div className="div side">
                    <Link to="/dashboard/headHRRegisterHR" className='link-decoration'>Register HR</Link>
                </div>
                <div className="text-wrapper-2 side">
                    <Link to="/dashboard/headHRAssignment" className='link-decoration'>Assignment</Link>
                </div>
                <div className="text-wrapper-3 side">
                    <Link to="/dashboard/headHRViewRejected" className='link-decoration'>Rejected</Link>
                </div>
                <div className="text-wrapper-4 side">
                    <Link to="/dashboard/headHRViewAllHRs" className="link-decoration">View HRs</Link>
                </div>
                <div className="text-wrapper-5 side">
                    <Link to="/dashboard/headHRViewApplications" className='link-decoration'>Applications</Link>
                </div>
            </div>
        </div>
    );
};

export default HeadHRComponents;
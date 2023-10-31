import React, { useState, useEffect } from 'react';
import "../HeadHR/HeadHRStyles/HeadHRProfile.css";
import { useNavigate } from "react-router-dom";
import squareImage from "./images/bg.png";
import Profile from "./images/profile.png";
import Call from "./images/call.png";
import Location from "./images/location.png";
import axios from 'axios';
import BD from "./images/cake.png";

const HeadHRProfile = () => {
    const navigate = useNavigate();
    const [adminDetails, setAdminDetails] = useState(null);

    const profileImage = "https://factohr-1a56a.kxcdn.com/wp-content/themes/factohr-theme/images/blog/10-Objectives-of-HRM/Main-Objectives-of-HRM.png";

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const email = localStorage.getItem('email');
                const response = await axios.get(`http://localhost:8080/api/admin/admin-details?email=${email}`);

                if (response.status === 200) {
                    setAdminDetails(response.data);
                } else {
                    console.error('Error fetching admin details');
                }
            } catch (error) {
                console.error('Error fetching admin details:', error);
            }
        };

        fetchAdminDetails();
    }, []);

    return (
        <>
            {adminDetails && (
                <div className='head-hr-profile'>
                    <div className='head-hr-profile-picture'>
                        <h1>{adminDetails.name}</h1>
                        <img className="circular-image" src={adminDetails.photo} alt="Profile" />
                    </div>
                    <div className='head-hr-background'>
                        <img src={squareImage} alt="Background" />
                    </div>
                    <button className='head-hr-logout-button' onClick={handleLogout}>LOGOUT</button>
                    <div className='head-hr-about'>
                        <h2>About</h2>
                        <div className="contact-info">
                            <div className='profile'>
                                <img src={Profile} />
                                <ul>Male</ul>
                                <span></span>
                            </div>
                            <div className='bd'>
                                <img src={BD} />
                                <ul>Born: 19/04/2003</ul>
                                <span></span>
                            </div>
                            <div className='location'>
                                <img src={Location} />
                                <ul>Address is this.</ul>
                                <span></span>
                            </div>
                            <div className='call'>
                                <img src={Call} />
                                <ul>9137389019</ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HeadHRProfile;
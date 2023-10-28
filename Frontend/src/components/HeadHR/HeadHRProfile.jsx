import React, { useEffect, useState } from 'react';
import "../HeadHR/HeadHRStyles/HeadHRProfile.css";
import { useNavigate } from "react-router-dom";
import squareImage from "./images/bg.png";
import Profile from "./images/profile.png";
import Call from "./images/call.png";
import Location from "./images/location.png";
import BD from "./images/cake.png";
import axios from 'axios';

const HeadHRProfile = () => {

    const [userDetails, setUserDetails] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const email = localStorage.getItem('email');
            const response = await axios.get(`http://localhost:8080/api/admin/admin-details?email=${email}`);
            setUserDetails(response.data);
        } catch (error) {
            setUserDetails(null);
            console.log(error);
        }
    };

    const profileImage = "data:image/jpeg;base64,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"


    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <>
            <div className='head-hr-profile'>
                <div className='head-hr-profile-picture'>
                    <h1>{userDetails?.name}</h1>
                    <img className="circular-image" src={userDetails?.photo} alt="Profile" />
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
                            <ul>Born June 26, 1980</ul>
                            <span></span>
                        </div>
                        <div className='location'>
                            <img src={Location} />
                            <ul>2239 Hog Camp Road Schaumburg <br />charles5182@ummoh.com</ul>
                            <span></span>
                        </div>
                        <div className='call'>
                            <img src={Call} />
                            <ul>33757005467</ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeadHRProfile;
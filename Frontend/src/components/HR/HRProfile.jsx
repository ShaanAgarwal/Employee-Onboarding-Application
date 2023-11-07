import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/HRProfileStyles.css";
import {useNavigate} from "react-router-dom";
import backendURL from "../../baseURL";

function HRProfile() {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const email = localStorage.getItem('email');
                const token = localStorage.getItem('token');
                const response = await axios.get(`${backendURL}/api/hr/hr-details?email=${email}`, {
                    headers: {
                        Authorization: token,
                    }
                });
                setUserDetails(response.data);
                setError(null);
            } catch (error) {
                setUserDetails(null);
                setError("User not found.");
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="hr-profile-container">
            {error && <p>{error}</p>}
            {userDetails && (
                <React.Fragment>
                    <div className="hr-profile-image">
                        <img src={userDetails.photo} alt="" />
                    </div>
                    <div className="hr-details">
                        <p className="hr-headline">HR</p>
                        <p className="personal-details">{userDetails.name}</p>
                        <p className="personal-details">{userDetails.email}</p>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

export default HRProfile;

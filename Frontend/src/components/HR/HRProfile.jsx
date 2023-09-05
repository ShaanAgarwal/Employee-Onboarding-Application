import React, { useState, useEffect } from "react";
import axios from "axios";

function HRProfile() {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const email = localStorage.getItem('email');
                const response = await axios.get(`http://localhost:8080/api/hr/hr-details?email=${email}`);
                setUserDetails(response.data);
                setError(null);
            } catch (error) {
                setUserDetails(null);
                setError("User not found.");
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            {userDetails && (
                <div>
                    <h2>User Details</h2>
                    <p>Name: {userDetails.name}</p>
                    <p>Email: {userDetails.email}</p>
                </div>
            )}
        </div>
    );
}

export default HRProfile;
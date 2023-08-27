import React from 'react'
import { Link } from 'react-router-dom';

const ApplicationResponse = () => {
    return (
        <>
        <div>Thankyou for applying. We will get back to you soon.</div>
        <Link to="/" className='button apply-button'>Go Back To HomePage</Link>
        </>
    );
};

export default ApplicationResponse;
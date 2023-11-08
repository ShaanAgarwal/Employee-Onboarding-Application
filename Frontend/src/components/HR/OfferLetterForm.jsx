import React, { useState } from 'react';
import axios from 'axios';
import '../HR/Styles/OfferLetterForm.css';
import backendURL from '../../baseURL';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import { useNavigate } from 'react-router-dom';

const OfferLetterForm = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        location: '',
        salary: '',
        induction: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            dispatch(showLoading());
            const response = await axios.post(`${backendURL}/api/hr/send-offer-letter`, formData);
            dispatch(hideLoading());
            console.log(response.data);
            setSuccessMessage('Form submitted successfully!');
            setIsFormSubmitted(true);
            navigate('/dashboard/HRViewCandidates/');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="centered-form">
            <form onSubmit={handleSubmit} className="form-container">
                <h1>Form</h1>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Position:</label>
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Salary:</label>
                    <input
                        type="text"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Induction Meeting Details:</label>
                    <input
                        type="text"
                        name="induction"
                        value={formData.induction}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
                {isFormSubmitted && <p>{successMessage}</p>}
            </form>
        </div>
    );
};

export default OfferLetterForm;
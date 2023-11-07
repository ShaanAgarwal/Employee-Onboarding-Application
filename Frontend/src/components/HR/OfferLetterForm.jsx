import React, { useState } from 'react';
import axios from 'axios';
import '../HR/Styles/OfferLetterForm.css';

const OfferLetterForm = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        location: '',
        salary: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/hr/send-offer-letter', formData);
            console.log(response.data);
            setSuccessMessage('Form submitted successfully!');
            setIsFormSubmitted(true);
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
                <button type="submit">Submit</button>
                {isFormSubmitted && <p>{successMessage}</p>}
            </form>
        </div>
    );
};

export default OfferLetterForm;
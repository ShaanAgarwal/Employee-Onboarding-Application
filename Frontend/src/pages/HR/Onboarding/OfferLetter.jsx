import React, { useState } from 'react';
import axios from 'axios';

const OfferLetter = () => {

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
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    Position:
                    <input type="text" name='position' value={formData.position} onChange={handleChange} />
                </label>
                <label>
                    Location:
                    <input type="text" name='location' value={formData.location} onChange={handleChange} />
                </label>
                <label>
                    Salary:
                    <input type="text" name='salary' value={formData.salary} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default OfferLetter;
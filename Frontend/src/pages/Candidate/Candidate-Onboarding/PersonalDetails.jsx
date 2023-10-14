import React, { useState } from 'react';
import axios from "axios";

const PersonalDetails = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    homeAddress: '',
    city: '',
    state: '',
    zipcode: '',
    jobRole: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    maritalStatus: '',
    aadharCardNumber: '',
    postalAddress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(`http://localhost:8080/api/onboarding/personal-details-fill?email=${formData.email}`, formData);
    console.log(response);
    console.log('Form Data Submitted:', formData);
    if (response.status === 200) {
      window.location.reload();
    }
  };

  return (
    <div>
      <h2>Personal Details Form</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Home Address:</label>
        <input type="text" name="homeAddress" value={formData.homeAddress} onChange={handleChange} required />

        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />

        <label>State:</label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} required />

        <label>Zip Code:</label>
        <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} required />

        <label>Job Role:</label>
        <input type="text" name="jobRole" value={formData.jobRole} onChange={handleChange} required />

        <label>Date of Birth:</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Blood Group:</label>
        <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required />

        <label>Marital Status:</label>
        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
          <option value="">Select Marital Status</option>
          <option value="Married">Married</option>
          <option value="Unmarried">Unmarried</option>
        </select>

        <label>Aadhar Card Number:</label>
        <input type="text" name="aadharCardNumber" value={formData.aadharCardNumber} onChange={handleChange} required />

        <label>Postal Address:</label>
        <input type="text" name="postalAddress" value={formData.postalAddress} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PersonalDetails;
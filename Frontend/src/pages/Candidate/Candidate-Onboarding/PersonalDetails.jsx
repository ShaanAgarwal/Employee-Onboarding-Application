import React, { useState } from 'react';
import axios from "axios";
import "./PersonalDetailsStyles.css";
import leftcontentlogo from "./Images/left-content-logo.png";

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
    const token = localStorage.getItem('token');
    const response = await axios.put(`http://localhost:8080/api/onboarding/personal-details-fill?email=${formData.email}`, formData, {
      headers: {
        Authorization: token,
      }
    });
    console.log(response);
    console.log('Form Data Submitted:', formData);
    if (response.status === 200) {
      window.location.reload();
    }
  };

  return (
    <>
      <div className='left-side-content'>
        <h1>EmpowerIn</h1>
        <img src={leftcontentlogo} alt="" />
      </div>
      <div className='personal-details-form'>
        <h2>Personal Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="name-grid">
            <div>
              <label>First Name:</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div>
              <label>Last Name:</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>
          <div className="name-grid">
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label>Phone:</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>
          <div className="name-grid">
            <div>
              <label>Home Address:</label>
              <input type="text" name="homeAddress" value={formData.homeAddress} onChange={handleChange} required />
            </div>
            <div>
              <label>City:</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
          </div>
          <div className="name-grid">
            <div>
              <label>State:</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </div>
            <div>
              <label>Zip Code:</label>
              <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} required />
            </div>
          </div>
          <div className="name-grid">
            <div>
              <label>Job Role:</label>
              <input type="text" name="jobRole" value={formData.jobRole} onChange={handleChange} required />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
            </div>
          </div>
          <div className="name-grid">
            <div>
              <label>Gender:</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label>Blood Group:</label>
              <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required />
            </div>
          </div>
          <div className='name-grid'>
            <div>
              <label>Marital Status:</label>
              <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
                <option value="">Select Marital Status</option>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
              </select>
            </div>
            <div>
              <label>Aadhar Card Number:</label>
              <input type="text" name="aadharCardNumber" value={formData.aadharCardNumber} onChange={handleChange} required />
            </div>
          </div>

          <label>Postal Address:</label>
          <input type="text" name="postalAddress" value={formData.postalAddress} onChange={handleChange} required />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default PersonalDetails;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ApplicationPageStyles.css';

import { useDispatch } from 'react-redux';
import {showLoading, hideLoading} from '../../redux/features/alertSlice';

const ApplicationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [startDate, setStartDate] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [resume, setResume] = useState(null);
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleJobRoleChange = (e) => {
    setJobRole(e.target.value);
  };

  const handleFileChange = (e) => {
    const fieldName = e.target.name;
    const file = e.target.files[0];

    if (fieldName === 'resume') {
      setResume(file);
    } else if (fieldName === 'photo') {
      setPhoto(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('pincode', pincode);
    formData.append('start_date', startDate);
    formData.append('job_role', jobRole);
    formData.append('resume', resume);
    formData.append('photo', photo);

    try {
      dispatch(showLoading());
      const response = await axios.post('http://localhost:8080/api/form/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(hideLoading());
      console.log(response.data);
      navigate('/applicationResponse');
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }
  };

  return (
    <>
      <div className='outside-page-application'>
        <div className='page-application'>
          <div className='header'><h1>Please Fill Out The Form Below To Submit Your Application</h1></div>
          <form className="form-grid" onSubmit={handleSubmit}>
            <div className='name-email-grid'>
              <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Please Enter Your Name" value={name} required="true" onChange={handleNameChange} />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Please Enter Your Email" value={email} required="true" onChange={handleEmailChange} />
              </div>
            </div>
            <div className="address-grid">
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" placeholder="Please Enter Your Address" value={address} required="true" onChange={handleAddressChange} />
            </div>
            <div className="city-pincode-grid">
              <div>
                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" placeholder="Please Enter Your City" value={city} required="true" onChange={handleCityChange} />
              </div>
              <div>
                <label htmlFor="pincode">Pincode:</label>
                <input type="text" id="pincode" name="pincode" placeholder="Please Enter Your Pincode" value={pincode} required="true" onChange={handlePincodeChange} />
              </div>
            </div>
            <div className="date-role-grid">
              <div>
                <label htmlFor="start_date">Start Date:</label>
                <input type="date" id="start_date" name="start_date" value={startDate} required="true" onChange={handleStartDateChange} />
              </div>
              <div>
                <label htmlFor="job_role">Job Role:</label>
                <select id="job_role" name="job_role" value={jobRole} required="true" onChange={handleJobRoleChange}>
                  <option value="">Select Job Role</option>
                  <option value="frontend-developer">Frontend Developer</option>
                  <option value="backend-developer">Backend Developer</option>
                  <option value="full-stack-developer">Full Stack Developer</option>
                  <option value="java-developer">Java Developer</option>
                  <option value="python-developer">Python Developer</option>
                  <option value="manager">Manager</option>
                  <option value="product-manager">Product Manager</option>
                  <option value="project-manager">Project Manager</option>
                  <option value="human-resources">Human Resources</option>
                  <option value="quality-assurance">Quality Assurance</option>
                  <option value="salesperson">Salesperson</option>
                  <option value="help-desk">Help Desk</option>
                </select>
              </div>
            </div>
            <div className="file-grid">
              <div>
                <label htmlFor="resume">Resume:</label>
                <input type="file" id="resume" name="resume" required="true" onChange={handleFileChange} />
              </div>
              <div>
                <label htmlFor="photo">Photo:</label>
                <input type="file" id="photo" name="photo" required="true" onChange={handleFileChange} />
              </div>
            </div>
            <button type="submit" className='submit-button'>Apply Now</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplicationPage;
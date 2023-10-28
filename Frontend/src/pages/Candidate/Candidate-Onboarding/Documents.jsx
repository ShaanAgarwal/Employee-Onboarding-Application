import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./DocumentStyles.css";
import lowerLeft from "./lower-left.png";
import companyLogo from "./company-logo.png";
import headerLogo from "./upload-document-logo.png";

const Documents = () => {

  const [aadharCard, setAadharCard] = useState(null);
  const [panCard, setPanCard] = useState(null);
  const [residentialProof, setResidentialProof] = useState(null);
  const [passport, setPassport] = useState(null);
  const [sscMarksheet, setSSCMarksheet] = useState(null);
  const [hscMarksheet, setHSCMarksheet] = useState(null);
  const [graduationMarksheet, setGraduationMarksheet] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const fieldName = e.target.name;
    const file = e.target.files[0];

    if (fieldName === 'aadharCard') {
      setAadharCard(file);
    } else if (fieldName === 'panCard') {
      setPanCard(file);
    } else if (fieldName === 'residentialProof') {
      setResidentialProof(file);
    } else if (fieldName === 'passport') {
      setPassport(file);
    } else if (fieldName === 'sscMarksheet') {
      setSSCMarksheet(file);
    } else if (fieldName === 'hscMarksheet') {
      setHSCMarksheet(file);
    } else if (fieldName === 'graduationMarksheet') {
      setGraduationMarksheet(file);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('aadharCard', aadharCard);
    formData.append('panCard', panCard);
    formData.append('residentialProof', residentialProof);
    formData.append('passport', passport);
    formData.append('sscMarksheet', sscMarksheet);
    formData.append('hscMarksheet', hscMarksheet);
    formData.append('graduationMarksheet', graduationMarksheet);

    try {
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:8080/api/onboarding/upload-documents?email=${email}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      console.log('Documents Uploaded:', formData);
      console.log(response);
    } catch (error) {
      console.error('Error uploading documents:', error);
    }
  };

  return (
    <div className='upload-documents-main-page'>
      <div className="main-document-form">
        <div className="upload-document-header">
          <h2>Upload Documents</h2>
          <img className='header-logo' src={headerLogo} alt="" />
        </div>
        <div className="documents">
          <form onSubmit={handleSubmit}>
            <div className='document-input'>
              <label>Aadhar Card:</label>
              <input type="file" name="aadharCard"  required onChange={handleFileChange} />
            </div>

            <div className='document-input'>
              <label>PAN Card:</label>
              <input type="file" name="panCard" required onChange={handleFileChange} />
            </div>

            <div className='document-input'>
              <label>Residential Proof:</label>
              <input type="file" name="residentialProof" required onChange={handleFileChange} />
            </div>

            <div className='document-input'>
              <label>Passport:</label>
              <input type="file" name="passport" required onChange={handleFileChange} />
            </div>

            <div className='document-input'>
              <label>SSC Marksheet:</label>
              <input type="file" name="sscMarksheet" required onChange={handleFileChange} />
            </div>

            <div className='document-input'>
              <label>HSC Marksheet:</label>
              <input type="file" name="hscMarksheet" required onChange={handleFileChange} />
            </div>

            <div className='document-input'>
              <label>Graduation Marksheet:</label>
              <input type="file" name="graduationMarksheet" required onChange={handleFileChange} />
            </div>

            <div>
              <button type="submit">Upload Documents</button>
            </div>
          </form>
        </div>
      </div>
      <div className='top-right'></div>
      <img className='company-logo' src={companyLogo} alt="" />
      <div className='left-side'>
        <img className="lower-left" src={lowerLeft} alt="" />
      </div>
    </div>
  );
};

export default Documents;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Styles/Documents.css"
import logo from "../images/Empowerin-Logo.png";
import left from "../images/upload-leftcorner.png";
import icon from "../images/upload-icon.png";
import backendURL from '../../../baseURL';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../../redux/features/alertSlice';

const Documents = () => {

  const [aadharCard, setAadharCard] = useState(null);
  const [panCard, setPanCard] = useState(null);
  const [residentialProof, setResidentialProof] = useState(null);
  const [passport, setPassport] = useState(null);
  const [sscMarksheet, setSSCMarksheet] = useState(null);
  const [hscMarksheet, setHSCMarksheet] = useState(null);
  const [graduationMarksheet, setGraduationMarksheet] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(showLoading());
      const response = await axios.put(`${backendURL}/api/onboarding/upload-documents?email=${email}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      dispatch(hideLoading());
      if (response.status === 200) {
        location.reload();
      };
    } catch (error) {
      console.error('Error uploading documents:', error);
    }
  };

  return (
    <div className='document-container'>
      <div className="design-compo">
        <div className="left-container">
          <div className="box"></div>
          <img className="logo" src={logo} />
          <img className="corner-picture" src={left} />
        </div>
        <div className="horizontal-container">
          <div className="box-2"><span></span></div>
        </div>
      </div>
      <div className="main-container">
        <div className="header">
          <img className="upload-icon" src={icon} />
          <h2 className='UD'>Upload Documents</h2>
        </div>
        <div className="form-data">
          <div className="form-header">
            <h2 style={{ textAlign: "left", marginTop: "0.8rem", marginLeft: "0.5rem" }}>No.</h2>
            <h2 style={{ textAlign: "left", marginTop: "0.8rem" }}>Document</h2>
            <h2 style={{ textAlign: "left", marginTop: "0.8rem" }}>Action Required</h2>
          </div>



          <form className="form" onSubmit={handleSubmit}>
            <div style={{ display: "flex" }} >
              <h4 style={{ display: "flex" }}>1</h4>
              <label>Aadhar Card:</label>
              <input type="file" name="aadharCard" required onChange={handleFileChange} />
            </div>

            <div style={{ display: "flex" }} >
              <h4>2</h4>
              <label>PAN Card:</label>
              <input type="file" name="panCard" required onChange={handleFileChange} />
            </div>

            <div style={{ display: "flex" }} >
              <h4>3</h4>
              <label>Residential Proof:</label>
              <input type="file" name="residentialProof" required onChange={handleFileChange} />
            </div>

            <div style={{ display: "flex" }} >
              <h4>4</h4>
              <label>Passport:</label>
              <input type="file" name="passport" required onChange={handleFileChange} />
            </div>

            <div style={{ display: "flex" }} >
              <h4>5</h4>
              <label>SSC Marksheet:</label>
              <input type="file" name="sscMarksheet" required onChange={handleFileChange} />
            </div>

            <div style={{ display: "flex" }} >
              <h4>6</h4>
              <label>HSC Marksheet:</label>
              <input type="file" name="hscMarksheet" required onChange={handleFileChange} />
            </div>

            <div style={{ display: "flex" }} >
              <h4>7</h4>
              <label>Graduation Marksheet:</label>
              <input type="file" name="graduationMarksheet" required onChange={handleFileChange} />
            </div>

            <button style={{ display: "block" }} className="button-upload" type="submit">Upload Documents</button>
          </form>

        </div>

      </div>

    </div>
  );
};

export default Documents;

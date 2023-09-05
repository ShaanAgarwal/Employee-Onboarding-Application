import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApplicationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('resume', resume);

    try {
      const response = await axios.post('http://localhost:8080/api/form/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigate('/applicationResponse');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Submit Your Application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label htmlFor="resume">Resume:</label>
          <input type="file" id="resume" name="resume" onChange={handleFileChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApplicationPage;

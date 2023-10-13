import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../HeadHR/HeadHRStyles/HeadHRViewAllHRs.css";

const HeadHRViewAllHRs = () => {
  const [hrs, setHrs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHrs() {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/getAllHRs');
        setHrs(response.data);
      } catch (error) {
        setError('An error occurred while fetching HRs');
      }
    }

    fetchHrs();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  };
  return (
    <>
      <div className='head-hr-view-all-hr'>
        <div className='hr-content'>
          <h1>View All HRs</h1>
          <ul>
            {hrs.map((hr) => (
              <li key={hr._id}>{hr.name} - {hr.email}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HeadHRViewAllHRs;
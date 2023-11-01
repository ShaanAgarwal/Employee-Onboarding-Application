import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../HeadHR/HeadHRStyles/HeadHRViewAllHRs.css";

const HeadHRViewAllHRs = () => {
  const [hrs, setHrs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHrs() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/admin/getAllHRs', {
          headers: {
            Authorization: token,
          }
        });
        setHrs(response.data);
      } catch (error) {
        setError('An error occurred while fetching HRs');
      }
    }

    fetchHrs();
  }, []);

  const image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZyys1x3ixo5J1L8Wr6HWX-uG2-MXgnRfBHBFQxbdBOjd-7wScsKkCllRnQm1r2oPxEQM&usqp=CAU";

  if (error) {
    return <div>Error: {error}</div>;
  };
  return (
    <>
      <div className='view-all-hr-page'>
        <div className='hr-content'>
          <div className='header-view-all-hr'>
            <h1>View All HRs</h1>
          </div>
          <div className='hr-div'>
            <ul className='hr-list'>
              {hrs.map((hr) => (
                <div className='hr-box' key={hr._id}>
                  <div className='hr-photo'>
                    <img src={hr.photo} alt='hr-photo' />
                  </div>
                  <div className='hr-details'>
                    <div className='hr-name'>{hr.name}</div>
                    <div className='hr-email'>{hr.email}</div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadHRViewAllHRs;
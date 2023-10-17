import React from 'react';
import { Link } from 'react-router-dom';
import "./HomePageStyles.css";

const HomePage = () => {
  return (
    <>
      <div className='container-homepage'>
        <div className='effect'>
          <div className="blur-circle" />
        </div>
        <div className="ellipse-1" />
        <div className="ellipse-2" />
        <div className='main-div'>
          <div className='header-div'>
            <img className='logo-img' src='./src/pages/Homepage/images/Logo.png' alt='img-logo' />
            <Link className="login-button" to="/login">
              Login
            </Link>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24.2773 20.875H22.1491C22.0037 20.875 21.8675 20.9406 21.7767 21.0562C21.5648 21.3219 21.3377 21.5781 21.0986 21.8219C20.1204 22.8326 18.9618 23.6381 17.6868 24.1937C16.3658 24.7697 14.946 25.0651 13.5121 25.0625C12.062 25.0625 10.6573 24.7687 9.33734 24.1937C8.06231 23.6381 6.90368 22.8326 5.92553 21.8219C4.94562 20.8146 4.16427 19.6206 3.62475 18.3062C3.06469 16.9437 2.78314 15.4969 2.78314 14C2.78314 12.5031 3.06771 11.0562 3.62475 9.69374C4.16361 8.37811 4.93861 7.19374 5.92553 6.17811C6.91244 5.16249 8.0598 4.36249 9.33734 3.80624C10.6573 3.23124 12.062 2.93749 13.5121 2.93749C14.9621 2.93749 16.3668 3.22811 17.6868 3.80624C18.9643 4.36249 20.1117 5.16249 21.0986 6.17811C21.3377 6.42499 21.5618 6.68124 21.7767 6.94374C21.8675 7.05936 22.0068 7.12499 22.1491 7.12499H24.2773C24.468 7.12499 24.5861 6.90624 24.4801 6.74061C22.1581 3.01561 18.0954 0.549986 13.4787 0.562486C6.22523 0.581236 0.409707 6.65936 0.482363 14.1375C0.555019 21.4969 6.36147 27.4375 13.5121 27.4375C18.1166 27.4375 22.1612 24.975 24.4801 21.2594C24.583 21.0937 24.468 20.875 24.2773 20.875ZM26.9686 13.8031L22.6728 10.3031C22.5123 10.1719 22.2792 10.2906 22.2792 10.5V12.875H12.7734C12.6402 12.875 12.5312 12.9875 12.5312 13.125V14.875C12.5312 15.0125 12.6402 15.125 12.7734 15.125H22.2792V17.5C22.2792 17.7094 22.5154 17.8281 22.6728 17.6969L26.9686 14.1969C26.9975 14.1735 27.021 14.1436 27.0371 14.1095C27.0532 14.0754 27.0615 14.0379 27.0615 14C27.0615 13.962 27.0532 13.9246 27.0371 13.8905C27.021 13.8564 26.9975 13.8265 26.9686 13.8031Z" fill="black" />
            </svg>
          </div>
          <div className='content-wrapper'>
            <div className='main-content'>
              <h1>Empower the</h1>
              <h1>Onboarding</h1>
              <h1>process </h1>
              <h3>WITH US</h3>
              <div className='apply'>
                <Link className="button apply-button" to="/applyForJob">
                  Apply
                </Link>
              </div>
              <h4>Happy Hiring</h4>
            </div>
            <div className='main-slider'>
              <img src='./src/pages/Homepage/images/homepage1.png' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

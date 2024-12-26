import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="animation-container">
        <img
          src="https://i.gifer.com/7VE.gif" /* Replace with your desired animated image URL */
          alt="Breaking Robot Animation"
          className="error-animation"
        />
      </div>
      <h1>Oops! Something Went Wrong</h1>
      <p>
        Our little robot friend accidentally broke this page. Let’s get you back
        on track!
      </p>
      <Link to="/" className="back-home-button">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;

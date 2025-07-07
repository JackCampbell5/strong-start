import React from "react";
import ReactDOM from "react-dom";
import "./Contact.css";
import PropTypes from "prop-types";

function Contact({}) {
  return (
    <div className="Contact">
      <h1>Contact Us</h1>
      <h2> Coming soon! </h2>
      <p>For now use this button</p>
      <button
        className="contactButton"
        onClick={() => window.open("mailto:StrongStart@gmail.com")}
      >
        Contact
      </button>
    </div>
  );
}

Contact.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default Contact;

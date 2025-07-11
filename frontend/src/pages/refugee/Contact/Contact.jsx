// Node Module Imports
import React from "react";

// Local Imports
import "./Contact.css";

function Contact() {
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

export default Contact;

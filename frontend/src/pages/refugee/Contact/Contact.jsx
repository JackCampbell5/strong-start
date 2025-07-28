// Node Module Imports
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Local Imports
import "./Contact.css";

function Contact({ data }) {
  const formUrl = data.contact_form_link;
  return (
    <div className="Contact">
      <h1>Contact Us</h1>
      {!formUrl ? (
        <p className="noForm">
          Contact form not found please contact {data.name} at{" "}
          <a href={"mailto:" + data.email}>{data.email}</a>
        </p>
      ) : (
        <div className="contactForm">
          <a href={formUrl} target="_blank">
            <button className="contactButton">Open Form In New Tab</button>
          </a>
          <div className="contactForm">
            <iframe src={formUrl + "?embedded=true"}>Loading…</iframe>
          </div>
        </div>
      )}
    </div>
  );
}

Contact.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Contact;

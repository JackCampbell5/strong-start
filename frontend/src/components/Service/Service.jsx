// Node Module Imports
import React from "react";
import PropTypes from "prop-types";

// Local Imports
import "./Service.css";

/**
 *  A service component that displays info about a specific service a nonprofit has added
 * @param {object} data - Info on a specific service
 */
function Service({ data }) {
  return (
    <div className="Service">
      <h3>{data.name}</h3>
      {Object.entries(data).map((obj) => {
        const key = obj[0]; // gets the key from obj.entries
        const info = obj[1]; // gets the string stored at the given key from obj.entries
        return key !== "id" && key !== "name" && key !== "addressInfo" ? (
          <p key={key}>
            <strong>{key}:</strong> {info}
          </p>
        ) : null;
      })}
    </div>
  );
}

Service.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Service;

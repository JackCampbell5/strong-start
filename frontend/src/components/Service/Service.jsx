import React from "react";
import ReactDOM from "react-dom";
import "./Service.css";
import PropTypes from "prop-types";

function Service({ data }) {
  return (
    <div className="Service">
      <h3>{data.name}</h3>
      {Object.entries(data).map((obj) => {
        let key = obj[0]; // gets the key from obj.entries
        let dict = obj[1]; // gets the dict stored at the given key from obj.entries
        return key !== "id" && key !== "name" ? (
          <p key={key}>
            <strong>{key}:</strong> {dict}
          </p>
        ) : null;
      })}
    </div>
  );
}

Service.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default Service;

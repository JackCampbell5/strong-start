// Node Module Imports
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// Local Imports
import "./RecService.css";
// Other Components
import Service from "#components/Service/Service";

function RecService({ data }) {
  return (
    <div className="RecService">
      <div className="serviceHeader">
        <h3>RecService</h3>
      </div>
      <Service data={data} />
    </div>
  );
}

RecService.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RecService;

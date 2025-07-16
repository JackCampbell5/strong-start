// Node Module Imports
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { MdAddHome } from "react-icons/md";

// Local Imports
import "./RecService.css";
// Other Components
import Service from "#components/Service/Service";

function RecService({ data }) {
  const name = data?.name ?? "No Name Provided";

  return (
    <div className="RecService">
      <div className="serviceHeader">
        <h3 className="serviceTitle">{name}</h3>
        <MdAddHome />
      </div>
      <Service data={{ ...data, name: undefined }} />
    </div>
  );
}

RecService.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RecService;

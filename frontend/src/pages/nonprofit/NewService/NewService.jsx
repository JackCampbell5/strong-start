import React from "react";
import ReactDOM from "react-dom";
import "./NewService.css";
import PropTypes from "prop-types";
import EditService from "#components/EditService/EditService";

function NewService({}) {
  return (
    <div className="NewService">
      <h3>NewService</h3>
      <EditService />
    </div>
  );
}

NewService.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default NewService;

import React from "react";
import ReactDOM from "react-dom";
import "./NewService.css";
import PropTypes from "prop-types";
import EditService from "#components/EditService/EditService";

function NewService() {
  return (
    <div className="NewService">
      <h1>Create a New Service</h1>
      <EditService />
    </div>
  );
}

export default NewService;

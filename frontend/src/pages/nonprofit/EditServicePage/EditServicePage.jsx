import React from "react";
import ReactDOM from "react-dom";
import "./EditServicePage.css";
import PropTypes from "prop-types";
import EditService from "#components/EditService/EditService";

function EditServicePage({}) {
  return (
    <div className="EditServicePage">
      <h3>EditServicePage</h3>
      <EditService />
    </div>
  );
}

EditServicePage.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default EditServicePage;

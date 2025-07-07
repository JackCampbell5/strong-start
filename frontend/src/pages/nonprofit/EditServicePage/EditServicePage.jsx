import React from "react";
import ReactDOM from "react-dom";
import "./EditServicePage.css";
import { useState } from "react";
import PropTypes from "prop-types";

// Components
import EditService from "#components/EditService/EditService";
import SelectService from "#components/SelectService/SelectService";

function EditServicePage({}) {
  const [serviceID, setServiceID] = useState("default");
  const [serviceName, setServiceName] = useState("default");

  return (
    <div className="EditServicePage">
      <h1>Edit Service</h1>
      <SelectService
        setServiceID={setServiceID}
        setServiceName={setServiceName}
      />
      {serviceID !== "default" ? (
        <div className="editOneService">
          <h1>Editing {serviceName}</h1> <EditService serviceID={serviceID} />{" "}
        </div>
      ) : null}
    </div>
  );
}

EditServicePage.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default EditServicePage;

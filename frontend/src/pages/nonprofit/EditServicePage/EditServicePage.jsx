import React from "react";
import ReactDOM from "react-dom";
import "./EditServicePage.css";
import { useState } from "react";
import PropTypes from "prop-types";

// Components
import EditService from "#components/EditService/EditService";
import SelectService from "#components/SelectService/SelectService";

//Utils
import { serviceNameInputDefault } from "#default-data/serviceDefaultData";

function EditServicePage({}) {
  const [serviceID, setServiceID] = useState(serviceNameInputDefault.id);
  const [serviceName, setServiceName] = useState(serviceNameInputDefault.id);

  return (
    <div className="EditServicePage">
      <h1>Edit Service</h1>
      <SelectService
        setServiceID={setServiceID}
        setServiceName={setServiceName}
      />
      {serviceID !== serviceNameInputDefault.id ? (
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

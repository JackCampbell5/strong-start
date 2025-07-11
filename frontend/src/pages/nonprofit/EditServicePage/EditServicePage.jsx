// Node Module Imports
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

// Local Imports
import "./EditServicePage.css";
// Other Components
import EditService from "#components/EditService/EditService";
import SelectService from "#components/SelectService/SelectService";
//Util Functions
import { serviceNameInputDefault } from "#default-data/serviceDefaultData";

function EditServicePage({}) {
  // State Variables
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

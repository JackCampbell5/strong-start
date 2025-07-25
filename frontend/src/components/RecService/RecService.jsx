// Node Module Imports
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { MdAddHome, MdDelete, MdCreate } from "react-icons/md";

// Local Imports
import "./RecService.css";
// Other Components
import Service from "#components/Service/Service";
import EditService from "#components/EditService/EditService";
import { getNonProfit } from "#utils/pathUtils";
import { deleteServiceFromDatabase } from "#fetch/serviceFetchUtils";

function RecService({ data, serviceAddedSuccessfully }) {
  // Constant Variables
  const name = data?.name ?? "No Name Provided";
  const nonprofit = getNonProfit();
  const existingInCurrentDatabase = nonprofit === data.nonprofit_ID;
  // State Variables
  const [isExpanded, setIsExpanded] = useState(false);
  const [errorText, setErrorText] = useState("");

  /**
   * If the employee successfully adds a service, we want to remove it from the recommended list so we call the function passed in from the parent list component
   */
  function onValidAdd(validAddData) {
    if (!existingInCurrentDatabase) {
      serviceAddedSuccessfully(data.id);
    } else {
      serviceAddedSuccessfully(data.id, validAddData, true);
      setIsExpanded(false);
    }
  }

  /**
   * Takes the result of the delete service endpoint and updates the UI accordingly
   * @param {object} result - The result of the delete service endpoint
   */
  function deleteServiceCallback(result) {
    if (result.valid) {
      serviceAddedSuccessfully(data.id, null, false, true);
    } else {
      setErrorText(result.error);
    }
  }

  /**
   *  Function that is called when the user clicks the delete button.
   *   + If the service is in the current database, we delete it from the database.
   *   + Otherwise, we just remove it from the recommended list.
   */
  function deleteService() {
    if (existingInCurrentDatabase) {
      deleteServiceFromDatabase(nonprofit, data.id).then(deleteServiceCallback);
    } else {
      serviceAddedSuccessfully(data.id);
    }
  }

  return (
    <div className="RecService">
      <div className="serviceHeader">
        <h3 className="serviceTitle">{name}</h3>
        <MdDelete
          title="Delete Service from Database"
          onClick={deleteService}
        />
        <div
          title="Edit/Add Service to Database"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {existingInCurrentDatabase ? <MdCreate /> : <MdAddHome />}
        </div>
      </div>
      <Service inputData={{ ...data, name: undefined }} />
      {isExpanded && (
        <div className="editTopDivider">
          <EditService
            inputData={data}
            onValidAdd={onValidAdd}
            serviceID={existingInCurrentDatabase ? data.id : null}
          />
        </div>
      )}
      <div className="errorText">{errorText}</div>
    </div>
  );
}

RecService.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RecService;

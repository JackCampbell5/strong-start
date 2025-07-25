// Node Module Imports
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { MdAddHome, MdCreate } from "react-icons/md";

// Local Imports
import "./RecService.css";
// Other Components
import Service from "#components/Service/Service";
import EditService from "#components/EditService/EditService";
import { getNonProfit } from "#utils/pathUtils";

function RecService({ data, serviceAddedSuccessfully }) {
  // Constant Variables
  const name = data?.name ?? "No Name Provided";
  const nonprofit = getNonProfit();
  const existingInCurrentDatabase = nonprofit === data.nonprofit_ID;
  // State Variables
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <div className="RecService">
      <div className="serviceHeader">
        <h3 className="serviceTitle">{name}</h3>
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
    </div>
  );
}

RecService.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RecService;

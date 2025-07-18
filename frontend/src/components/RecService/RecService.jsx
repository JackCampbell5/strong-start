// Node Module Imports
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { MdAddHome } from "react-icons/md";

// Local Imports
import "./RecService.css";
// Other Components
import Service from "#components/Service/Service";
import EditService from "#components/EditService/EditService";

function RecService({ data, serviceAddedSuccessfully }) {
  const name = data?.name ?? "No Name Provided";
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * If the employee successfully adds a service, we want to remove it from the recommended list so we call the function passed in from the parent list component
   */
  function onValidAdd() {
    serviceAddedSuccessfully(data.id);
  }

  return (
    <div className="RecService">
      <div className="serviceHeader">
        <h3 className="serviceTitle">{name}</h3>
        <MdAddHome onClick={() => setIsExpanded((prev) => !prev)} />
      </div>
      <Service inputData={{ ...data, name: undefined }} />
      {isExpanded && <EditService inputData={data} onValidAdd={onValidAdd} />}
    </div>
  );
}

RecService.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RecService;

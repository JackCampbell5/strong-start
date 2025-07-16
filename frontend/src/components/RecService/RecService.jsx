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

function RecService({ data, doneAdded }) {
  const name = data?.name ?? "No Name Provided";
  const [isExpanded, setIsExpanded] = useState(false);

  function successAdded() {
    doneAdded(data.id);
  }

  return (
    <div className="RecService">
      <div className="serviceHeader">
        <h3 className="serviceTitle">{name}</h3>
        <MdAddHome onClick={() => setIsExpanded((prev) => !prev)} />
      </div>
      <Service data={{ ...data, name: undefined }} />
      {isExpanded && <EditService inputData={data} onValidAdd={successAdded} />}
    </div>
  );
}

RecService.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RecService;

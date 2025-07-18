// Node Module Imports
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useState } from "react";

// Local imports
import "./RecList.css";
// Other components
import RecService from "#components/RecService/RecService";

function RecList({ data }) {
  const [serviceList, setServiceList] = useState(data);
  const [successText, setSuccessText] = useState("");

  /**
   * Removes the service from the list of services using the id of the service
   * + This will show a success message for 5 seconds and no longer show the service
   * @param {string} id - The id of the service that was added
   */
  function serviceAddedSuccessfully(id) {
    let updatedData = data.filter((item) => item.id !== id);
    setSuccessText("Service Added Successfully");
    setTimeout(() => {
      setSuccessText("");
    }, 5000);
    setServiceList(updatedData);
  }
  return (
    <div className="RecList">
      <p className="successText">{successText}</p>
      <div className="allRecs">
        {serviceList
          ? serviceList.map((obj) => {
              return (
                <RecService
                  key={obj.id}
                  data={obj}
                  serviceAddedSuccessfully={serviceAddedSuccessfully}
                />
              );
            })
          : null}
      </div>
      <div className="ServiceTotal">
        <p className="ServiceTotalNum">{serviceList.length} </p>
        <p className="ServiceTotalLabel"> Services Displayed</p>
      </div>
    </div>
  );
}

RecList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RecList;

// Node Module Imports
import React from "react";
import { useEffect, useState } from "react";
import PropTypes, { func } from "prop-types";

// Local Imports
import "./SelectService.css";
// Util functions
import { fetchServiceNameList } from "#fetch/serviceFetchUtils";
import { serviceNameInputDefault } from "#default-data/serviceDefaultData.js";
import { getNonProfit } from "#utils/pathUtils";

function SelectService({ setServiceID, setServiceName }) {
  {
    // Constant Variables
    const nonprofit = getNonProfit();

    // State Variables
    const [serviceList, setServiceList] = useState([serviceNameInputDefault]);
    const [errorText, setErrorText] = useState("");

    /**
     * Handles the change event for the select service dropdown
     * @param {Event} e - The event object for when the employee selects a service
     */
    function onSelectChange(e) {
      const value = e.target.value;
      setServiceID(value);
      const selectedIndex = e.target.selectedIndex;
      const selectedText = e.target.options[selectedIndex].text;
      setServiceName(selectedText);
    }

    /**
     * Updates the service list state variable with the result of the fetchServiceNameList function if valid and provides error if not
     * @param {object} result - The result object from the fetchServiceNameList function
     */
    function serviceNameListCallback(result) {
      if (result.valid) {
        let data = result.data;
        setErrorText("");
        if (data[0].id !== serviceNameInputDefault.id) {
          data = [serviceNameInputDefault, ...data];
        }
        setServiceList(data);
      } else {
        setErrorText(result.error);
      }
    }

    useEffect(() => {
      fetchServiceNameList(nonprofit).then(serviceNameListCallback);
    }, []);

    return (
      <div className="SelectService">
        <h2>What Service would you like to edit?</h2>
        <div className="selectService">
          <select onChange={onSelectChange} defaultValue={serviceList[0].id}>
            {serviceList.map((val) => {
              return (
                <option key={val.id} value={val.id} text={val.text}>
                  {val.text}
                </option>
              );
            })}
          </select>
        </div>
        <p className="errorText">{errorText}</p>
      </div>
    );
  }
}

SelectService.propTypes = {
  setServiceID: PropTypes.func.isRequired,
  setServiceName: PropTypes.func.isRequired,
};

export default SelectService;

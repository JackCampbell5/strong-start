// Node Module Imports
import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Local Imports
import "./EditService.css";
// Other Components
import LoadingButton from "#components/LoadingButton/LoadingButton";
// Util Functions
import serviceInputDefaultValuesJson from "#default-data/serviceInputDefaultValues.json";
import { serviceSearchIconMap } from "#utils/serviceIconUtils";
import {
  fetchServiceDetails,
  postService,
  putService,
} from "#fetch/serviceFetchUtils";
import { reformatData } from "#utils/textUtils";
import { getNonProfit } from "#utils/pathUtils";
import { fillMissingDataFields } from "#utils/selectUtils";

/**
 * Component for editing a service
 * + If inputData is given then the service will be filled in with the data
 * + If serviceID is given then the service will be fetched and the params will be filled in
 * + If both are given, the input data will be used to edit the service and no data will be fetched
 * + If neither is given then a new service will be created when the employee hits submit.
 * @param {string} serviceID - The ID of the service to get the params to edit(Optional)
 * @param {object} inputData - The data to fill in the service with(Optional)
 * @param {function} onValidAdd - Callback for when the service is successfully added
 * @returns - React element
 */
function EditService({
  serviceID = null,
  inputData = null,
  onValidAdd = () => {},
}) {
  // Constant Variables
  const serviceInputDefaultValues = JSON.parse(
    JSON.stringify(serviceInputDefaultValuesJson)
  );
  const nonprofit = getNonProfit();
  const serviceInputDefaultData = Object.values(serviceInputDefaultValues);

  //State Variables
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [loading, setLoading] = useState("");
  const [serviceInput, setServiceInput] = useState(serviceInputDefaultData);

  /**
   * Submit the service to the backend
   */
  function serviceSubmit() {
    // Check to make sure the data is valid and print and error message if it is not
    const invalid = checkRequired(serviceInput);
    if (!invalid) {
      setErrorText("");
      setLoading(true);

      const data = reformatData(serviceInput);
      if (serviceID) {
        putService(data, nonprofit, serviceID).then(submitCallback);
      } else {
        postService(data, nonprofit).then(submitCallback);
      }
    } else {
      setErrorText(invalid);
    }
  }

  /**
   * Check to make sure the required fields are filled out
   * @param {object} data  - The data to check
   * @returns
   */
  function checkRequired(data) {
    let errorMessage = "";
    for (let param of data) {
      if (param.value === "" && param.required) {
        errorMessage += param.name + " is required. ";
      } else if (
        param.id === "zipcode" &&
        param.value !== "" &&
        !/^\d{5}$|^\d{5}\-\d{4}$/.test(param.value)
      ) {
        errorMessage += "Zipcode must be in the form 12345 or 12345-6789.";
      }
    }
    if (errorMessage !== "") {
      errorMessage += "Please fill out the required fields and try again.";
    }
    return errorMessage;
  }

  /**
   * Checks to see if the service was submitted successfully and reloads the page if it was and prints the error message if it wasn't
   * @param {string} success - Blank if successful and the error message if not
   */
  function submitCallback(success) {
    setLoading(false);
    if (success.result) {
      if (!serviceID) {
        setServiceInput(serviceInput.map((obj) => ({ ...obj, value: "" })));
      }
      onValidAdd();
      setSuccessText("Service successfully uploaded");
      setTimeout(() => {
        setSuccessText("");
      }, 5000); // 5000 milliseconds = 5 seconds
    } else {
      setErrorText(success.error);
    }
  }

  /**
   * Callback for fetching the service details if one exists
   * @param {*} result - The result of fetchServiceDetails
   */
  function fetchServiceCallback(result) {
    setLoading(false);
    if (result.valid) {
      setErrorText("");
      // Make sure the data that was sent back includes the icon and default values
      let completeData = fillMissingDataFields(
        result.data,
        serviceInputDefaultValues
      );
      setServiceInput(completeData);
    } else {
      setErrorText(result.error);
    }
  }

  useEffect(() => {
    // If given data then fill in the serviceInput with the data
    if (inputData) {
      const completeData = serviceInputDefaultData.map((obj) => {
        if (!inputData[obj.id]) return obj;
        obj.value = inputData[obj.id];
        return obj;
      });
      setServiceInput(completeData);
    } else if (serviceID) {
      // If given a serviceID then fetch the service details
      setLoading(true);
      fetchServiceDetails(nonprofit, serviceID).then(fetchServiceCallback);
    }
  }, [serviceID]);

  return (
    <div className="EditService">
      <div className="allServiceParams">
        {serviceInput.map((obj, index) => {
          return (
            <div className="serviceParam" key={obj.id + "Class"}>
              <p className={obj.id + "P"}>{obj.name}:</p>
              {obj.icon
                ? React.createElement(serviceSearchIconMap[obj.icon], {})
                : null}{" "}
              {obj.id === "description" ? (
                <textarea
                  key={obj.id + "Input"}
                  className={obj.id + "Input"}
                  type="text"
                  value={obj.value}
                  placeholder={obj.default}
                  onChange={(e) => {
                    const value = e.target.value;
                    const data = [...serviceInput];
                    data[index].value = value;
                    setServiceInput(data);
                  }}
                />
              ) : (
                <input
                  key={obj.id + "Input"}
                  className={obj.id + "Input"}
                  type="text"
                  value={obj.value}
                  placeholder={obj.default}
                  onChange={(e) => {
                    const value = e.target.value;
                    const data = [...serviceInput];
                    data[index].value = value;
                    setServiceInput(data);
                  }}
                />
              )}
              {obj.tooltip && (
                <span className="tooltiptext">{obj.tooltip}</span>
              )}
            </div>
          );
        })}
      </div>
      <LoadingButton loading={loading} onClick={serviceSubmit} text="Submit" />
      <p className="errorText">{errorText}</p>
      <p className="successText">{successText}</p>
    </div>
  );
}

EditService.propTypes = {
  serviceID: PropTypes.string.isRequired,
};

export default EditService;

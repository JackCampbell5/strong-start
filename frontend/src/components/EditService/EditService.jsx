import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "./EditService.css";
import PropTypes from "prop-types";

// Other Components
import LoadingButton from "#components/LoadingButton/LoadingButton";

// Util Methods
import { serviceInputDefaultValues } from "#default-data/serviceDefaultData.js";
import serviceInputDefaultData from "#default-data/serviceInputDefaultData.json";
import {
  fetchServiceDetails,
  postService,
  putService,
} from "#fetch/serviceFetchUtils";
import { reformatData } from "#utils/textUtils";
import { getNonProfit } from "#utils/pathUtils";

function EditService({ serviceID = null }) {
  let nonprofit = getNonProfit();
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [loading, setLoading] = useState("");

  const [serviceInput, setServiceInput] = useState(serviceInputDefaultData);

  /**
   * Submit the service to the backend
   */
  function serviceSubmit() {
    // Check to make sure the data is valid and print and error message if it is not
    let invalid = checkRequired(serviceInput);
    if (!invalid) {
      setErrorText("");
      setLoading(true);

      let data = reformatData(serviceInput);
      if (serviceID) {
        putService(data, nonprofit, serviceID).then(submitReturn);
      } else {
        postService(data, nonprofit).then(submitReturn);
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
    for (let a of data) {
      if (a.value === "" && a.required) {
        errorMessage += a.name + " is required. ";
      } else if (
        a.id === "zipcode" &&
        a.value !== "" &&
        !/^\d{5}$|^\d{5}\-\d{4}$/.test(a.value)
      ) {
        retStr += "Zipcode must be in the form 12345 or 12345-6789.";
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
  function submitReturn(success) {
    setLoading(false);
    if (success.result) {
      if (!serviceID) {
        setServiceInput(serviceInput.map((obj) => ({ ...obj, value: "" })));
      }
      setSuccessText("Service successfully uploaded");
      setTimeout(() => {
        setSuccessText("");
      }, 5000); // 5000 milliseconds = 5 seconds
    } else {
      setErrorText(success.error);
    }
  }

  useEffect(() => {
    if (serviceID) {
      setLoading(true);
      fetchServiceDetails(nonprofit, serviceID).then((data) => {
        setLoading(false);
        if (data.valid) {
          setErrorText("");
          // Make sure the data that was sent back includes the icon and default values
          let completeData = [];
          for (let a of data) {
            let key = a.id;
            if (serviceInputDefaultValues[key]) {
              if (!a.default) {
                a.default = serviceInputDefaultValues[key].default;
              }
              if (!a.icon) {
                a.icon = serviceInputDefaultValues[key].icon;
              }
              if (!a.name) {
                a.name = serviceInputDefaultValues[key].name;
              }
              if (!a.required) {
                a.required = serviceInputDefaultValues[key].required;
              }
            }
            completeData.push(a);
          }
          setServiceInput(completeData);
        } else {
          setErrorText(data.error);
        }
      });
    }
  }, [serviceID]);

  return (
    <div className="EditService">
      <div className="allServiceParams">
        {serviceInput.map((obj, index) => {
          return (
            <div className="serviceParam" key={obj.id + "Class"}>
              <p id={obj.id + "P"}>{obj.name}:</p>
              {obj.icon ? <obj.icon /> : null}
              {obj.id === "description" ? (
                <textarea
                  key={obj.id + "Input"}
                  id={obj.id + "Input"}
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
                  id={obj.id + "Input"}
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

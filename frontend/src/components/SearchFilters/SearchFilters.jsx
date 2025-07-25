// Node Module Imports
import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// Local Imports
import "./SearchFilters.css";
// Other Components
import LoadingButton from "#components/LoadingButton/LoadingButton";
import TimeInput from "#components/TimeInput/TimeInput";
// Util Methods
import { fetchServiceFilters } from "#fetch/serviceFetchUtils";
import serviceSearchDefault from "#default-data/serviceSearchDefault.json";
import { serviceSearchIconMap } from "#utils/serviceIconUtils";
import { reformatData } from "#utils/textUtils";
import { getNonProfit } from "#utils/pathUtils";
import { fillMissingDataFields } from "#utils/selectUtils";
import { createDatetimeString } from "#utils/hoursUtils";

function SearchFilters({ loading, setLoading, searchFor }) {
  // Constant Variables
  const nonprofit = getNonProfit();
  const animatedComponents = makeAnimated();

  // State Variables
  const [errorText, setErrorText] = useState("");
  // Uses serviceSearchDefault which is a list of objects that contain the name, icon, and default value for each param
  const [searchInput, setSearchInput] = useState([]);

  /**
   * Submit the search to the backend
   */
  function searchSubmit() {
    // Check to make sure the data is valid and print and error message if it is not
    const data = searchInput;
    const invalid = checkRequired(data);
    if (invalid) {
      setErrorText(invalid);
    } else {
      setErrorText("");
      searchFromData(data);
    }
  }

  /**
   * Searches for the data from the backend
   * @param {object} input The data to search for
   */
  function searchFromData(input) {
    const reformattedData = reformatData(input);
    searchFor(reformattedData);
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
      }
    }
    if (errorMessage !== "") {
      errorMessage += "Please fill out the required fields and try again.";
    }
    return errorMessage;
  }

  function filterCallback(results) {
    if (results.valid) {
      setLoading(false);
      let data = fillMissingDataFields(results.data, serviceSearchDefault);
      setSearchInput(data);
    } else {
      setErrorText(results.error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchServiceFilters(nonprofit).then(filterCallback);
  }, []);

  return (
    <div className="SearchFilters">
      <h1>Filters</h1>
      <div className="allSearch">
        {searchInput.map((obj, index) => (
          <div className="searchParam" key={obj.id + "Class"}>
            <p className={obj.id + "P"}>{obj.name}:</p>
            {obj.icon
              ? React.createElement(serviceSearchIconMap[obj.icon], {})
              : null}
            {obj.options ? (
              <Select
                classNamePrefix="custom-select"
                closeMenuOnSelect={false}
                isMulti={true}
                options={obj.options}
                components={animatedComponents}
                onChange={(e) => {
                  let value = e;
                  if (e.length === 0) value = "";
                  const data = [...searchInput];
                  data[index].value = JSON.stringify(value);
                  setSearchInput(data);
                }}
              />
            ) : obj.id === "attend_time" ? (
              <TimeInput
                data={obj.default}
                updateData={(dataReceived) => {
                  const time = dataReceived.hours
                    ? createDatetimeString(dataReceived)
                    : "";
                  const data = [...searchInput];
                  data[index].value = time;
                  data[index].default = dataReceived;
                  setSearchInput(data);
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
                  const data = [...searchInput];
                  data[index].value = value;
                  setSearchInput(data);
                }}
              />
            )}
            <span className="tooltiptext">{obj.tooltip}</span>
          </div>
        ))}
      </div>
      <LoadingButton loading={loading} onClick={searchSubmit} text="Submit" />
      <p className="errorText">{errorText}</p>
    </div>
  );
}

SearchFilters.propTypes = {
  loading: PropTypes.bool.isRequired,
  searchFor: PropTypes.func.isRequired,
};

export default SearchFilters;

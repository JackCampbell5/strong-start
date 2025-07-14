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
// Util Methods
import { fetchServiceFilters } from "#fetch/serviceFetchUtils";
import serviceSearchDefault from "#default-data/serviceSearchDefault.json";
import { serviceSearchIconMap } from "#utils/serviceIconUtils";
import { reformatData } from "#utils/textUtils";
import { getNonProfit } from "#utils/pathUtils";

function SearchFilters({ loading, searchFor }) {
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
    for (const a of data) {
      if (a.value === "" && a.required) {
        errorMessage += a.name + " is required. ";
      }
    }
    if (errorMessage !== "") {
      errorMessage += "Please fill out the required fields and try again.";
    }
    return errorMessage;
  }

  function filterCallback(results) {
    if (results.valid) {
      let data = results.data;
      setSearchInput(results.data);
    } else {
      setErrorText(results.console.error());
    }
  }

  useEffect(() => {
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
            {obj.id === "services_needed" ? (
              (console.log(obj.options),
              (
                <Select
                  classNamePrefix="custom-select"
                  closeMenuOnSelect={false}
                  isMulti={true}
                  options={obj.options}
                  components={animatedComponents}
                />
              ))
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

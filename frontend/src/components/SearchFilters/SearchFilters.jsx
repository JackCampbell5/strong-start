// Node Module Imports
import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

// Local Imports
import "./SearchFilters.css";
// Other Components
import LoadingButton from "#components/LoadingButton/LoadingButton";
import InputField from "#components/InputField/InputField";
// Util Methods
import { fetchServiceFilters } from "#fetch/serviceFetchUtils";
import serviceSearchDefault from "#default-data/serviceSearchDefault.json";
import { reformatData } from "#utils/textUtils";
import { getNonProfit } from "#utils/pathUtils";
import { fillMissingDataFields } from "#utils/selectUtils";
import { setValueCreator } from "#utils/inputUtils";

function SearchFilters({ loading, setLoading, searchFor }) {
  // Constant Variables
  const nonprofit = getNonProfit();

  // State Variables
  const [errorText, setErrorText] = useState("");
  // Uses serviceSearchDefault which is a list of objects that contain the name, icon, and default value for each param
  const [searchInput, setSearchInput] = useState([]);

  // Constant depends on state variables so declared later
  const setValue = setValueCreator(searchInput, setSearchInput);

  /**
   * Submit the search to the backend
   */
  function searchSubmit() {
    // Check to make sure the data is valid and print and error message if it is not
    const data = searchInput;
    console.log(data);
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

  /**
   * Callback function for the fetchServiceFilters function. Sets the filter params if the data is valid and prints an error message if it is not
   * @param {object} results - The results of the fetchServiceFilters function
   */
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
          <InputField key={index} obj={obj} index={index} setValue={setValue} />
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

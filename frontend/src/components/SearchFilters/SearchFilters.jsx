import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "./SearchFilters.css";

// Other Components
import LoadingButton from "#components/LoadingButton/LoadingButton";

// Util Methods
import { serviceSearchDefault } from "#default-data/serviceDefaultData";
import { reformatData } from "#utils/textUtils";

function SearchFilters({ loading, searchFor }) {
  const [errorText, setErrorText] = useState("");
  const [searchInput, setSearchInput] = useState(serviceSearchDefault);

  /**
   * Submit the search to the backend
   */
  function searchSubmit() {
    // Check to make sure the data is valid and print and error message if it is not
    let data = searchInput;
    let invalid = checkRequired(data);
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
    let reformatedData = reformatData(data);
    searchFor(reformatedData);
  }

  /**
   * Check to make sure the required fields are filled out
   * @param {object} data  - The data to check
   * @returns
   */
  function checkRequired(data) {
    let retStr = "";
    for (let a of data) {
      if (a.value === "" && a.required) {
        retStr += a.name + " is required. ";
      }
    }
    if (retStr !== "") {
      retStr += "Please fill out the required fields and try again.";
      setErrorText(retStr);
      return false;
    } else {
      setErrorText("");
      return true;
    }
  }

  return (
    <div className="SearchFilters">
      <h1>Filters</h1>
      <div className="allSearch">
        {searchInput.map((obj, index) => (
          <div className="searchParam" key={obj.id + "Class"}>
            <p id={obj.id + "P"}>{obj.name}:</p>
            {obj.icon ? <obj.icon /> : null}
            <input
              key={obj.id + "Input"}
              id={obj.id + "Input"}
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
          </div>
        ))}
      </div>
      <LoadingButton loading={loading} onClick={searchSubmit} text="Submit" />
      <p className="errorText">{errorText}</p>
    </div>
  );
}

SearchFilters.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default SearchFilters;

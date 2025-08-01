// Node Module Imports
import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

// Local Imports
import "./NonProfitSelector.css";
// Util Functions
import { fetchNonProfitList } from "#fetch/nonProfitFetchUtils";
import nonprofitDefaultOption from "#default-data/nonprofitDefaultOption.json";
import { QueryParams } from "#utils/pathUtils";

function NonProfitSelector({ errorText, setErrorText }) {
  {
    // State Variables
    const [searchParams, setSearchParams] = useSearchParams();

    // Add query params when the dropdown is changed
    function addNonProfit(e) {
      const val = e.target.value;
      if (val === nonprofitDefaultOption.id) {
        setSearchParams(searchParams.delete(QueryParams.NONPROFIT));
      } else {
        searchParams.set(QueryParams.NONPROFIT, val); // Set your query parameter here
        setErrorText("");
      }
      setSearchParams(searchParams);
    }

    // Fetch the nonprofit list from the backend
    const [nonprofitList, setNonprofitList] = useState([
      nonprofitDefaultOption,
    ]);

    /**
     * Callback function for the nonprofit list fetch that sets the list or provides an error
     * @param {object} result - The result object from the fetchNonProfitList function
     */
    function nonprofitListCallback(result) {
      if (result.valid) {
        let data = result.data;
        if (!(data[0].id === nonprofitDefaultOption.id)) {
          data = [nonprofitDefaultOption, ...data];
        }
        setNonprofitList(data);
      } else {
        setErrorText(result.errorText);
      }
    }

    useEffect(() => {
      fetchNonProfitList().then(nonprofitListCallback);
    }, []);
    return (
      <div className="NonProfitSelector">
        <h2>What Non Profit are you looking for?</h2>
        <div className="select-nonprofit">
          <select
            onChange={addNonProfit}
            value={
              searchParams.get(QueryParams.NONPROFIT) ||
              nonprofitDefaultOption.id
            }
          >
            {nonprofitList.map((val) => {
              return (
                <option key={val.id} value={val.id}>
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

NonProfitSelector.propTypes = {
  errorText: PropTypes.string.isRequired,
  setErrorText: PropTypes.func.isRequired,
};

export default NonProfitSelector;

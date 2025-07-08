import React from "react";
import { useSearchParams } from "react-router-dom";
import "./NonProfitSelector.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { nonprofitDefaultOption } from "#default-data/nonProfitDefaultData.js";
import { fetchNonProfitList } from "#fetch/nonProfitFetchUtils";
import { QueryParams } from "#utils/pathUtils";

function NonProfitSelector({ errorText, setErrorText }) {
  {
    let [searchParams, setSearchParams] = useSearchParams();

    // Add query params when the dropdown is changed
    function addNonProfit(e) {
      let val = e.target.value;
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

    useEffect(() => {
      fetchNonProfitList().then((data) => {
        if (!(data[0].id === nonprofitDefaultOption.id)) {
          data = [nonprofitDefaultOption, ...data];
        }
        setNonprofitList(data);
      });
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

import React from "react";
import ReactDOM from "react-dom";
import "./NonProfitSelector.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { nonprofitAllDefault } from "#default-data/nonProfitDefaultData";
import { fetchNonProfitList } from "#fetch/nonProfitFetchUtils";

function NonProfitSelector({ errorText, setErrorText }) {
  {
    // Add query params when the dropdown is changed
    const navigate = useNavigate();
    function addNonProfit(e) {
      let val = e.target.value;
      const params = new URLSearchParams(location.search);
      if (val === "unselected") {
        params.delete("nonprofit");
      } else {
        params.set("nonprofit", val); // Set your query parameter here
        setErrorText("");
      }
      navigate(`?${params.toString()}`); // Update the URL with the new query parameter
    }

    // The default value of the selector should include th query params from the url if they exist
    function setSelectorFromParams() {
      const params = new URLSearchParams(location.search);
      const nonprofit = params.get("nonprofit");
      if (nonprofit !== null) {
        return nonprofit;
      }
    }

    // Fetch the nonprofit list from the backend
    const [nonprofitList, setNonprofitList] = useState([nonprofitAllDefault]);

    useEffect(() => {
      fetchNonProfitList().then((data) => {
        if (data[0].key !== "unselected") {
          data = [nonprofitAllDefault, ...data];
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
            defaultValue={setSelectorFromParams()}
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

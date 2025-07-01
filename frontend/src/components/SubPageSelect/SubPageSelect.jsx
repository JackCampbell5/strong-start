import React from "react";
import ReactDOM from "react-dom";
import "./SubPageSelect.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import IconComp from "#components/IconComp/IconComp";
import { IoEarth } from "react-icons/io5";
import { FaHandsHelping } from "react-icons/fa";

// Helper functions
import { fetchNonProfitList } from "#fetch/nonProfitFetchUtils";
import { nonprofitAllDefault } from "#default-data/nonProfitDefaultData";

import PropTypes, { checkPropTypes } from "prop-types";

function SubPageSelect({ changePage }) {
  // Make sure a nonprofit is selected before switching pages
  const location = useLocation();
  function changePageHelper(page) {
    const params = new URLSearchParams(location.search);
    console.log(params);
    if (params.get("nonprofit") !== null) {
      changePage(page);
    } else {
      setErrorText("Please select a non-profit to continue");
    }
  }

  // Add query params when the dropdown is changed
  const navigate = useNavigate();
  function addNonProfit(e) {
    let val = e.target.value;
    const params = new URLSearchParams(location.search);
    if (val === "unselected") {
      params.delete("nonprofit");
    } else {
      console.log(val);
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
  const [nonprofitList, setNonprofitList] = useState(nonprofitAllDefault);
  function setNonprofitListHelper(data) {
    if (!data[0].key === "unselected") {
      data = [{ id: "unselected", text: "Not Selected" }, ...data];
    }
    setNonprofitList(data);
  }

  // Error handling
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    fetchNonProfitList(setNonprofitListHelper);
  }, []);
  return (
    <div className="SubPageSelect">
      <IconComp />
      <main>
        <div className="flexContent">
          <h1>Welcome to Strong Start!</h1>
          <p className="welcomeText">
            Strong start is a site dedicated to matching refugees with essential
            services. To get started, click a button below that matches what
            your looking for. <br />
            {/* //TODO Maybe add more intro text here */}
            <br /> <strong>Refugee-</strong> A refugee looking to be matched
            with a service
            <br /> <strong>Non-Profit-</strong> A non-profit employee looking to
            edit/manage services
          </p>
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
          <h2>What Role Are you?</h2>
          <div className="select-div">
            <div
              className="select-buttons"
              onClick={() => changePageHelper("refugee")}
            >
              <IoEarth />
              Refugee
            </div>
            <div
              className="select-buttons"
              onClick={() => changePageHelper("nonprofit")}
            >
              <FaHandsHelping />
              Non-Profit
            </div>
          </div>
          <p className="errorText">{errorText}</p>
        </div>
      </main>
    </div>
  );
}

SubPageSelect.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default SubPageSelect;

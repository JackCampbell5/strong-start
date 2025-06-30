import React from "react";
import ReactDOM from "react-dom";
import "./SubPageSelect.css";
import IconComp from "#components/IconComp/IconComp";
import { IoEarth } from "react-icons/io5";
import { FaHandsHelping } from "react-icons/fa";

import PropTypes, { checkPropTypes } from "prop-types";

function SubPageSelect({ changePage }) {
  return (
    <div className="SubPageSelect">
      <IconComp />
      <main>
        <h1>Welcome to Strong Start!</h1>
        <h2>What Role Are you?</h2>
        <div className="select-div">
          <div className="select-buttons" onClick={() => changePage("refugee")}>
            <IoEarth />
            Refugee
          </div>
          <div
            className="select-buttons"
            onClick={() => changePage("nonprofit")}
          >
            <FaHandsHelping />
            Non-Profit
          </div>
        </div>
      </main>
    </div>
  );
}

SubPageSelect.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default SubPageSelect;

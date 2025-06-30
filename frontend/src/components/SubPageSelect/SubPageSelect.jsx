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
        <div className="flexContent">
          <h1>Welcome to Strong Start!</h1>
          <p className="welcomeText">
            Strong start is a site dedicated to matching refugees with essential
            services. To get started click a button below to get redirected to
            the site that matches you the best. <br />
            <br /> <strong>Refugee-</strong> A refugee looking to be matched
            with a service
            <br /> <strong>Non-Profit-</strong> A non-profit employee looking to
            edit/manage services
          </p>
          <h2>What Role Are you?</h2>
          <div className="select-div">
            <div
              className="select-buttons"
              onClick={() => changePage("refugee")}
            >
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
        </div>
      </main>
    </div>
  );
}

SubPageSelect.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default SubPageSelect;

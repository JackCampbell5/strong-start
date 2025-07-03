import React from "react";
import ReactDOM from "react-dom";
import "./NavRefugee.css";
import PropTypes from "prop-types";

// Other components
import IconComp from "#components/IconComp/IconComp";
import { getLocation, RPages } from "#utils/pathUtils";

function NavRefugee({ navSet }) {
  const location = getLocation();

  return (
    <div className="NavRefugee">
      <div className="navLogo" onClick={() => navSet("")}>
        <IconComp />
      </div>{" "}
      <h3>Refugee</h3>
      <div className="navAllButtons">
        <button
          className={[
            "navBarButton",
            location === RPages.HOME ? "selected" : "unselected",
          ].join(" ")}
          onClick={() => navSet(RPages.HOME)}
        >
          Home
        </button>
        <button
          className={[
            "navBarButton",
            location === RPages.ALLSERVICES ? "selected" : "unselected",
          ].join(" ")}
          onClick={() => navSet(RPages.ALLSERVICES)}
        >
          All Services
        </button>
        <button
          className={[
            "navBarButton",
            location === RPages.CONTACT ? "selected" : "unselected",
          ].join(" ")}
          onClick={() => navSet(RPages.CONTACT)}
        >
          Contact
        </button>
        <button
          className={[
            "navBarButton",
            location === RPages.HELP ? "selected" : "unselected",
          ].join(" ")}
          onClick={() => navSet(RPages.HELP)}
        >
          Help
        </button>
      </div>
    </div>
  );
}

NavRefugee.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default NavRefugee;

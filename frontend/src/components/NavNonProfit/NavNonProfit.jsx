// Node Module Imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import IconComp from "#components/IconComp/IconComp";
import { IoIosArrowDropdown } from "react-icons/io";

// Local Imports
import "./NavNonProfit.css";
// Util Functions
import { getLocation, NpPages } from "#utils/pathUtils";
import { logoutNonprofitEmployee } from "#fetch/nonprofitEmployeeFetchUtils";
import { getNonProfit } from "#utils/pathUtils";

function NavNonProfit({ onNavigate }) {
  // Constant Variables
  const nonprofit = getNonProfit();
  const location = getLocation();

  // State Variables
  const [isAccountNavExpanded, setIsAccountNavExpanded] = useState(false);

  /**
   * Retracts the account dropdown if the user clicks outside of it
   * @param {Event} e -  the event object
   */
  function handleClickOutside(e) {
    if (!e.target.closest(".dropdownActiveButton")) {
      if (isAccountNavExpanded) {
        setIsAccountNavExpanded(false);
      }
    }
  }
  /**
   * Logout the current user if one is logged in
   */
  function logout() {
    logoutNonprofitEmployee(nonprofit).then(logoutCallback);
  }
  /**
   * Gives the user a message on whether the logout was successful or not
   * @param {object} result - The result of the logout request
   */
  function logoutCallback(result) {
    if (result.valid) {
      alert("You have been logged out");
    } else {
      alert("Error logging out" + result.error);
    }
  }
  // When account nav is expanded add the event listener to the window
  useEffect(
    () => window.addEventListener("click", handleClickOutside),
    [isAccountNavExpanded]
  );
  return (
    <div className="NavNonProfit">
      <div className="navLogo" onClick={() => onNavigate("")}>
        <IconComp />
      </div>
      <div className="navAllButtons">
        <button
          className={[
            "navBarButton",
            location === NpPages.DASHBOARD && "selected",
          ].join(" ")}
          onClick={() => onNavigate(NpPages.DASHBOARD)}
        >
          Dashboard
        </button>
        <button
          className={[
            "navBarButton",
            location === NpPages.EDITSERVICE && "selected",
          ].join(" ")}
          onClick={() => onNavigate(NpPages.EDITSERVICE)}
        >
          EditService
        </button>
        <button
          className={[
            "navBarButton",
            location === NpPages.NEWSERVICE && "selected",
          ].join(" ")}
          onClick={() => onNavigate(NpPages.NEWSERVICE)}
        >
          NewService
        </button>
        <button
          className={[
            "navBarButton",
            location === NpPages.SEARCHSERVICE && "selected",
          ].join(" ")}
          onClick={() => onNavigate(NpPages.SEARCHSERVICE)}
        >
          SearchService
        </button>
        <button
          className={[
            "navBarButton",
            location === NpPages.VIEWSERVICES && "selected",
          ].join(" ")}
          onClick={() => onNavigate(NpPages.VIEWSERVICES)}
        >
          ViewServices
        </button>
        <button
          className={[
            "navBarButton",
            location === NpPages.RECOMMEND && "selected",
          ].join(" ")}
          onClick={() => onNavigate(NpPages.RECOMMEND)}
        >
          Recommend
        </button>
        <div className="account-dropdown">
          <button
            className="navBarButton dropdownActiveButton"
            onClick={() => {
              setIsAccountNavExpanded((prevIsExpanded) => !prevIsExpanded);
            }}
          >
            Account <IoIosArrowDropdown className="dropdownArrow" />
          </button>
          <div
            className={[
              "dropdown-content",
              isAccountNavExpanded ? "dropdown-shown" : "dropdown-not-shown",
            ].join(" ")}
          >
            <button
              className={[
                "navBarButton",
                location === NpPages.LOGIN && "selected",
              ].join(" ")}
              onClick={() => onNavigate(NpPages.LOGIN)}
            >
              Login
            </button>
            <button
              className={[
                "navBarButton",
                location === NpPages.REGISTER && "selected",
              ].join(" ")}
              onClick={() => onNavigate(NpPages.REGISTER)}
            >
              Register
            </button>
            <button className={"navBarButton"} onClick={() => logout()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

NavNonProfit.propTypes = {
  onNavigate: PropTypes.func.isRequired, // Function to navigate to a different page every time a button is clicked
};

export default NavNonProfit;

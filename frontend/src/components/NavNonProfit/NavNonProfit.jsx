import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./NavNonProfit.css";
import PropTypes from "prop-types";
import IconComp from "#components/IconComp/IconComp";
import { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { getLocation, NpPages } from "#utils/pathUtils";

function NavNonProfit({ onNavigate }) {
  // Get the location for sections in the nav bar
  const location = getLocation();

  // Set the state of the dropdown menu
  const [isAccountNavExpanded, setIsAccountNavExpanded] = useState(false);
  useEffect(
    () => window.addEventListener("click", handleClickOutside),
    [isAccountNavExpanded]
  );
  function handleClickOutside(e) {
    if (!e.target.closest(".dropdownActiveButton")) {
      if (isAccountNavExpanded) {
        setIsAccountNavExpanded(false);
      }
    }
  }

  return (
    <div className="NavNonProfit">
      <div className="navLogo" onClick={() => onNavigate("")}>
        <IconComp />
      </div>
      <div className="navAllButtons">
        <button
          className={[
            "navBarButton",
            location === NpPages.DASHBOARD ? "selected" : "unselected",
          ].join(" ")}
          onClick={() => onNavigate(NpPages.DASHBOARD)}
        >
          Dashboard
        </button>
        <button
          className={[
            "navBarButton",
            location === NpPages.EDITSERVICE ? "selected" : "unselected",
          ].join(" ")}
          onClick={() => onNavigate(NpPages.EDITSERVICE)}
        >
          EditService
        </button>
        <button
          className={[
            "navBarButton",
            location === NpPages.NEWSERVICE ? "selected" : "unselected",
          ].join(" ")}
          onClick={() => onNavigate(NpPages.NEWSERVICE)}
        >
          NewService
        </button>
        <button
          className={[
            "navBarButton",
            location === NpPages.SEARCHSERVICE ? "selected" : "unselected",
          ].join(" ")}
          onClick={() => onNavigate(NpPages.SEARCHSERVICE)}
        >
          SearchService
        </button>
        <button
          className={[
            "navBarButton",
            location === NpPages.VIEWSERVICES ? "selected" : "unselected",
          ].join(" ")}
          onClick={() => onNavigate(NpPages.VIEWSERVICES)}
        >
          ViewServices
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
            className="dropdown-content"
            id={isAccountNavExpanded ? "shown" : "not-shown"}
          >
            <button
              className={[
                "navBarButton",
                location === NpPages.LOGIN ? "selected" : "unselected",
              ].join(" ")}
              onClick={() => onNavigate(NpPages.LOGIN)}
            >
              Login
            </button>
            <button
              className={[
                "navBarButton",
                location === NpPages.REGISTER ? "selected" : "unselected",
              ].join(" ")}
              onClick={() => onNavigate(NpPages.REGISTER)}
            >
              Register
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

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

export default NavNonProfit;

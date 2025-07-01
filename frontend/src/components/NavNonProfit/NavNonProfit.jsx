import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./NavNonProfit.css";
import PropTypes from "prop-types";
import IconComp from "#components/IconComp/IconComp";
import { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { getLocation, NpPages } from "#utils/pathUtils";

function NavNonProfit({ navSet }) {
  // Get the location for sections in the nav bar
  const location = getLocation();

  // Set the state of the dropdown menu
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  useEffect(
    () => window.addEventListener("click", handleClickOutside),
    [isNavExpanded]
  );
  function handleClickOutside(e) {
    if (!e.target.closest("#dropdownActiveButton")) {
      if (isNavExpanded) {
        setIsNavExpanded(false);
      }
    }
  }

  return (
    <div className="NavNonProfit">
      <div className="navLogo" onClick={() => navSet("")}>
        <IconComp />
      </div>
      <div className="navAllButtons">
        <button
          className="navBarButton"
          id={location === NpPages.DASHBOARD ? "selected" : "unselected"}
          onClick={() => navSet(NpPages.DASHBOARD)}
        >
          Dashboard
        </button>
        <button
          className="navBarButton"
          id={location === NpPages.EDITSERVICE ? "selected" : "unselected"}
          onClick={() => navSet(NpPages.EDITSERVICE)}
        >
          EditService
        </button>
        <button
          className="navBarButton"
          id={location === NpPages.NEWSERVICE ? "selected" : "unselected"}
          onClick={() => navSet(NpPages.NEWSERVICE)}
        >
          NewService
        </button>
        <button
          className="navBarButton"
          id={location === NpPages.SEARCHSERVICE ? "selected" : "unselected"}
          onClick={() => navSet(NpPages.SEARCHSERVICE)}
        >
          SearchService
        </button>
        <button
          className="navBarButton"
          id={location === NpPages.VIEWSERVICES ? "selected" : "unselected"}
          onClick={() => navSet(NpPages.VIEWSERVICES)}
        >
          ViewServices
        </button>
        <div className="account-dropdown">
          <button
            className="navBarButton"
            id="dropdownActiveButton"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
            Account <IoIosArrowDropdown className="dropdownArrow" />
          </button>
          <div
            className="dropdown-content"
            id={isNavExpanded ? "shown" : "not-shown"}
          >
            <button
              className="navBarButton"
              id={location === NpPages.LOGIN ? "selected" : "unselected"}
              onClick={() => navSet(NpPages.LOGIN)}
            >
              Login
            </button>
            <button
              className="navBarButton"
              id={location === NpPages.SIGNUP ? "selected" : "unselected"}
              onClick={() => navSet(NpPages.SIGNUP)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

NavNonProfit.propTypes = {
  nav: PropTypes.func.isRequired,
};

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onClick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
export default NavNonProfit;

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router";
import "./RefugeeOverall.css";
import PropTypes from "prop-types";

// Other pages
import Contact from "#refugeePage/Contact/Contact";
import Home from "#refugeePage/Home/Home";
import SearchResults from "#refugeePage/SearchResults/SearchResults";
import Help from "#refugeePage/Help/Help";

//Other Components
import FooterRefugee from "#components/FooterRefugee/FooterRefugee";
import NavRefugee from "#components/NavRefugee/NavRefugee";

// Utils
import { RPages } from "#utils/pathUtils";

function RefugeeOverall() {
  const priorPart = "/refugee/";
  const navigate = useNavigate();
  function nav(path) {
    navigate(priorPart + path);
  }

  return (
    <div className="RefugeeOverall">
      <NavRefugee navSet={nav} />
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* The default path will probably end up as the home page*/}
          <Route path={`/${RPages.HOME}`} element={<Home />} />
          <Route
            path={`/${RPages.SEARCHRESULTS}`}
            element={<SearchResults />}
          />
          <Route path={`/${RPages.CONTACT}`} element={<Contact />} />
          <Route path={`/${RPages.HELP}`} element={<Help />} />
        </Routes>
      </div>
      <FooterRefugee />
    </div>
  );
}

export default RefugeeOverall;

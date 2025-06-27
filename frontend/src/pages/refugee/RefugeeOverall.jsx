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

function RefugeeOverall({}) {
  const priorPart = "/refugee/";
  const navigate = useNavigate();

  return (
    <div className="RefugeeOverall">
      <NavRefugee />
      <h3>RefugeeOverall</h3>
      <button onClick={() => navigate(`${priorPart}`)}>Refugee Root Dir</button>
      <button onClick={() => navigate(`${priorPart}contact`)}>Contact</button>
      <button onClick={() => navigate(`${priorPart}home`)}>Home</button>
      <button onClick={() => navigate(`${priorPart}searchresults`)}>
        SearchResults
      </button>
      <button onClick={() => navigate(`${priorPart}help`)}>Help</button>
      <Routes>
        <Route path="/" element={<h1>Refugee Root Dir</h1>} />
        {/* The default path will probably end up as the home page*/}
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Home />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/help" element={<Help />} />
      </Routes>
      <FooterRefugee />
    </div>
  );
}

RefugeeOverall.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default RefugeeOverall;

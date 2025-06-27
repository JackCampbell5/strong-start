import React from "react";
import ReactDOM from "react-dom";
import "./Home.css";
import PropTypes from "prop-types";
import SearchFilters from "#components/SearchFilters/SearchFilters";

function Home({}) {
  return (
    <div className="Home">
      <h3>Home</h3>
      <SearchFilters />
    </div>
  );
}

Home.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default Home;

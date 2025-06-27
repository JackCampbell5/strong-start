import React from "react";
import ReactDOM from "react-dom";
import "./SearchResults.css";
import PropTypes from "prop-types";
import SearchFilters from "#components/SearchFilters/SearchFilters";
import ServiceList from "#components/ServiceList/ServiceList";

function SearchResults({}) {
  return (
    <div className="SearchResults">
      <h3>SearchResults</h3>
      <SearchFilters />
      <ServiceList />
    </div>
  );
}

SearchResults.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default SearchResults;

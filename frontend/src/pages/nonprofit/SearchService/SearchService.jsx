import React from "react";
import ReactDOM from "react-dom";
import "./SearchService.css";
import PropTypes from "prop-types";
import SearchFilters from "#components/SearchFilters/SearchFilters";
import ServiceList from "#components/ServiceList/ServiceList";

function SearchService({}) {
  return (
    <div className="SearchService">
      <h3>SearchService</h3>
      <SearchFilters />
    </div>
  );
}

SearchService.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default SearchService;

import React, { use } from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "./SearchService.css";
import PropTypes, { func } from "prop-types";

// Other components
import SearchFilters from "#components/SearchFilters/SearchFilters";
import ServiceList from "#components/ServiceList/ServiceList";

// utils
import { fetchSearch } from "#fetch/serviceFetchUtils";

function SearchService({}) {
  const [loading, setLoading] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function searchFor(data) {
    setLoading(true);
    fetchSearch(data).then((results) => {
      setLoading(false);
      setSearchResults(results.data);
    });
  }
  return (
    <div className="SearchService">
      <h3>SearchService</h3>
      <SearchFilters loading={loading} searchFor={searchFor} />
      <h1>Search Results</h1>
      {searchResults.length !== 0 ? <ServiceList data={searchResults} /> : null}
    </div>
  );
}

SearchService.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default SearchService;

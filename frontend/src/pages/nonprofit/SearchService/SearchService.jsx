import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
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
      setSearchResults(results);
    });
  }
  return (
    <div className="SearchService">
      <h3>SearchService</h3>
      <SearchFilters loading={loading} searchFor={searchFor} />
      {searchResults.length !== 0 ? (
        <ServiceList searchResults={searchResults} />
      ) : null}
    </div>
  );
}

SearchService.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default SearchService;

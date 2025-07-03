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
  const [errorText, setErrorText] = useState("");

  function searchFor(data) {
    setLoading(true);
    fetchSearch(data).then((results) => {
      if (results.valid) {
        setLoading(false);
        setSearchResults(results);
      } else {
        setErrorText(results.error);
      }
    });
  }
  return (
    <div className="SearchService">
      <h3>SearchService</h3>
      <SearchFilters loading={loading} searchFor={searchFor} />
      {searchResults.length !== 0 ? (
        <ServiceList searchResults={searchResults} />
      ) : null}
      <p className="errorText">{errorText}</p>
    </div>
  );
}

SearchService.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default SearchService;

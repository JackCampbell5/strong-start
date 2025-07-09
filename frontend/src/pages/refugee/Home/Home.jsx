import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import "./Home.css";
import PropTypes from "prop-types";

// Other components
import SearchFilters from "#components/SearchFilters/SearchFilters";
import ServiceList from "#components/ServiceList/ServiceList";

// utils
import { fetchSearch } from "#fetch/serviceFetchUtils";
import { getNonProfit } from "#utils/pathUtils";

function Home() {
  let nonprofit = getNonProfit();
  const [loading, setLoading] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorText, setErrorText] = useState("");

  function searchFor(data) {
    setLoading(true);
    fetchSearch(nonprofit, data).then((results) => {
      if (results.valid) {
        setLoading(false);
        setSearchResults(results.data);
      } else {
        setErrorText(results.error);
      }
    });
  }
  return (
    <div className="SearchService">
      <h3>Home</h3>
      <SearchFilters loading={loading} searchFor={searchFor} />
      {searchResults.length !== 0 ? <ServiceList data={searchResults} /> : null}
      <p className="errorText">{errorText}</p>
    </div>
  );
}

export default Home;

// Node Module Imports
import React from "react";
import { useState } from "react";

// Local Imports
import "./Home.css";
// Other components
import SearchFilters from "#components/SearchFilters/SearchFilters";
import ServiceList from "#components/ServiceList/ServiceList";
// Util Functions
import { fetchSearch } from "#fetch/serviceFetchUtils";
import { getNonProfit } from "#utils/pathUtils";

function Home() {
  // Constant Variables
  const nonprofit = getNonProfit();

  // State Variables
  const [loading, setLoading] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorText, setErrorText] = useState("");

  /**
   * Searches for services based on the given data and sets the results if valid and error text if not
   * @param {object} data - The data to search for
   */
  function searchFor(data) {
    setLoading(true);
    fetchSearch(nonprofit, data).then(searchCallback);
  }

  /**
   *  Sets the search results and error text based on the results of the fetchSearch function
   * @param {object} results - Results from the fetchSearch function
   */
  function searchCallback(results) {
    setLoading(false);
    if (results.valid) {
      setErrorText("");
      setSearchResults(results.data);
    } else {
      setErrorText(results.error);
    }
  }
  return (
    <div className="Home">
      <h1 className="homeHeader">Home</h1>
      <SearchFilters
        loading={loading}
        setLoading={setLoading}
        searchFor={searchFor}
      />
      <p className="errorText">{errorText}</p>
      {searchResults.length !== 0 ? <ServiceList data={searchResults} /> : null}
    </div>
  );
}

export default Home;

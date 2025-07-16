// Node Module Imports
import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

// Local imports
import "./Recommend.css";
// Other components
import ServiceList from "#components/ServiceList/ServiceList";
import LoadingButton from "#components/LoadingButton/LoadingButton";
// util functions
import { fetchRecommendations } from "#fetch/serviceFetchUtils";
import { getNonProfit } from "#utils/pathUtils";

function Recommend() {
  // Constant Variables
  const nonprofit = getNonProfit();

  // State Variables
  const [searchResults, setSearchResults] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  function getRecommendations() {
    setLoading(true);
    fetchRecommendations(nonprofit).then(fetchRecommendationsCallback);
  }
  function fetchRecommendationsCallback(result) {
    setLoading(false);
    if (!result.valid) {
      setErrorText(result.error);
    } else {
      setSearchResults(result.data);
    }
  }

  return (
    <div className="Recommend">
      <h3>Recommend</h3>
      {searchResults.length === 0 ? (
        <LoadingButton
          onClick={getRecommendations}
          loading={loading}
          text={"Recommend"}
          fit={true}
        />
      ) : (
        <ServiceList services={searchResults} />
      )}
      <p className="errorText">{errorText}</p>
    </div>
  );
}

export default Recommend;

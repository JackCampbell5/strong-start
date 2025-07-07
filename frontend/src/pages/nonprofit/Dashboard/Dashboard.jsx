import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "./Dashboard.css";
import PropTypes from "prop-types";

// Other components
import EditService from "#components/EditService/EditService";

// Helper functions
import { fetchNonProfitStats } from "#fetch/nonProfitFetchUtils";
import { statsDefault } from "#default-data/nonProfitDefaultData.js";

function Dashboard({}) {
  const [siteStats, setSiteStats] = useState(statsDefault);

  useEffect(() => {
    fetchNonProfitStats(setSiteStats);
  }, []);
  return (
    <div className="Dashboard">
      <div className="dashHeader largeHeader">Dashboard</div>
      <p>This will give directions on how to use Strong Start </p>
      <div className="dashHeader smallHeader">Your Site</div>
      <p>How your sites doing</p>
      <div className="siteStats">
        <div className="siteStatLeft">
          {Object.entries(siteStats).map((obj, key) => {
            return <p key={obj[0]}>{obj[1].name}</p>;
          })}
        </div>
        <div className="siteStatRight">
          {Object.entries(siteStats).map((obj, key) => {
            return <p key={obj[0]}>{obj[1].key}</p>;
          })}
        </div>
      </div>
      <div className="dashHeader smallHeader">Create New Service</div>
      <EditService />
    </div>
  );
}

Dashboard.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default Dashboard;

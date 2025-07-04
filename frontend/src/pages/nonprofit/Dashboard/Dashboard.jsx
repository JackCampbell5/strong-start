import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "./Dashboard.css";
import PropTypes from "prop-types";

// Other components
import EditService from "#nonprofitPage/EditServicePage/EditServicePage";

// Helper functions
import { fetchNonProfitStats } from "#fetch/nonProfitFetchUtils";
import { statsDefault } from "#default-data/nonProfitDefaultData";

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
          {Object.entries(siteStats).map((obj) => {
            let key = obj[0]; // gets the key from obj.entries
            let dict = obj[1]; // gets the dict stored at the given key from obj.entries
            return <p key={key}>{dict.name}</p>;
          })}
        </div>
        <div className="siteStatRight">
          {Object.entries(siteStats).map((obj) => {
            let key = obj[0]; // gets the key from obj.entries
            let dict = obj[1]; // gets the dict stored at the given key from obj.entries
            return <p key={key}>{dict.key}</p>;
          })}
        </div>
      </div>
      <EditService />
    </div>
  );
}

Dashboard.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default Dashboard;

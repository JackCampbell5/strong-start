import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import "./Dashboard.css";
import PropTypes from "prop-types";
import { formatVarName } from "#utils/textUtils";

function Dashboard({}) {
  const statsDefault = {
    servicesNumber: { name: "Services #", key: 0 },
    servicesOffered: { name: "Services offered", key: 0 },
    popularZipCode: { name: "Popular Zip Codes", key: 0 },
    servicesOffered2: { name: "Cost", key: 0 },
  };
  const [siteStats, setSiteStats] = useState(statsDefault);

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
    </div>
  );
}

Dashboard.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default Dashboard;

import React from "react";
import ReactDOM from "react-dom";
import "./ServiceList.css";
import PropTypes from "prop-types";
import Service from "#components/Service/Service";

function ServiceList({}) {
  return (
    <div className="ServiceList">
      <h3>ServiceList</h3>
      <Service />
    </div>
  );
}

ServiceList.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default ServiceList;

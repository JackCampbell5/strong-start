import React from "react";
import ReactDOM from "react-dom";
import "./ViewServices.css";
import PropTypes from "prop-types";
import SearchFilters from "#components/SearchFilters/SearchFilters";
import ServiceList from "#components/ServiceList/ServiceList";

function ViewServices({}) {
  return (
    <div className="ViewServices">
      <h3>ViewServices</h3>
      <SearchFilters />
      <ServiceList />
    </div>
  );
}

ViewServices.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default ViewServices;

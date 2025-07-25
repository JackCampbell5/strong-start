import React from "react";
import ReactDOM from "react-dom";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Local Imports
import "./PrivateRoutes.css";
import { NpPages } from "#utils/pathUtils";
import PropTypes from "prop-types";

function PrivateRoutes({ loggedIn }) {
  const location = useLocation();
  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={`/nonprofit/${NpPages.LOGIN}?${urlParams}`} />
  );
}

PropTypes.PrivateRoutes = {
  loggedIn: PropTypes.bool,
};

export default PrivateRoutes;

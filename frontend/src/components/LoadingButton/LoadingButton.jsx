import React from "react";
import ReactDOM from "react-dom";
import "./LoadingButton.css";
import PropTypes from "prop-types";

function LoadingButton({ loading, onClick, text }) {
  {
    return (
      <div className="LoadingButton">
        <button onClick={onClick}>
          {loading ? (
            <div className="loadingInside">
              Loading
              <p className="loading__letter">.</p>
              <p className="loading__letter">.</p>
              <p className="loading__letter">.</p>
              <p className="loading__letter">.</p>
            </div>
          ) : (
            text
          )}
        </button>
      </div>
    );
  }
}

LoadingButton.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoadingButton;

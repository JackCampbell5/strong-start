// Node Module Imports
import React from "react";
import PropTypes from "prop-types";

// Local Imports
import "./LoadingButton.css";

function LoadingButton({ loading, onClick, text, fit = false }) {
  function handleClick() {
    if (!loading) {
      onClick();
    }
  }
  {
    return (
      <div className={["LoadingButton", fit ? "fitText" : "setSize"].join(" ")}>
        <button
          onClick={handleClick}
          className={loading ? "currentlyLoading" : "notLoading"}
        >
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
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default LoadingButton;

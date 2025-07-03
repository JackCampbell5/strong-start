import React from "react";
import ReactDOM from "react-dom";
import "./LoadingButton.css";
import PropTypes from "prop-types";

function LoadingButton({ loading, onClick, text }) {
  {
    return (
      <div className="LoadingButton">
        <button onClick={onClick} className={"loading" + loading}>
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

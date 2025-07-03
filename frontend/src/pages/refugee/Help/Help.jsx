import React from "react";
import ReactDOM from "react-dom";
import "./Help.css";
import PropTypes from "prop-types";

function Help({}) {
  return (
    <div className="Help">
      <h1>Help</h1>
      <p className="helpText">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
        possimus asperiores repudiandae deserunt impedit dolore illum. Eos,
        consequatur. Nostrum, eaque consequatur. Nesciunt id iusto possimus
        repudiandae autem in mollitia rem.
      </p>
    </div>
  );
}

Help.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default Help;

// Node Module Imports
import React from "react";
import { useNavigate } from "react-router";

// Local Imports
import "./Help.css";

function Help({}) {
  // Constant Variables
  const navigate = useNavigate();
  return (
    <div className="Help">
      <h1>Help</h1>
      <h3>In the wrong nonprofit? </h3>
      <button onClick={() => navigate("/")}>Change Nonprofit</button>
      <h3>Other Questions?</h3>
      <p className="helpText">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
        possimus asperiores repudiandae deserunt impedit dolore illum. Eos,
        consequatur. Nostrum, eaque consequatur. Nesciunt id iusto possimus
        repudiandae autem in mollitia rem.
      </p>
    </div>
  );
}

export default Help;

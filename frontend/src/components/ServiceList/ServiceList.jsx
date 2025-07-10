import React from "react";
import ReactDOM from "react-dom";
import "./ServiceList.css";
import PropTypes from "prop-types";
import Service from "#components/Service/Service";

function ServiceList({ data }) {
  let num = 0;
  return (
    <div className="ServiceList">
      <div className="allServices">
        {data
          ? data.map((obj) => {
              num++;
              return <Service key={obj.id} data={obj} />;
            })
          : null}
      </div>
      <div id="ServiceTotal">
        <p id="ServiceTotalNum">{num} </p>
        <p id="ServiceTotalLabel"> Services Displayed</p>
      </div>
    </div>
  );
}

ServiceList.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default ServiceList;

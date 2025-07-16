// Node Module Imports
import React from "react";
import PropTypes from "prop-types";

// Local Imports
import "./ServiceList.css";
// Other Components
import Service from "#components/Service/Service";

function ServiceList({ data }) {
  let num = 0;
  return (
    <div className="ServiceList">
      <div className="allServices">
        {data
          ? data.map((obj) => {
              num++;
              return (
                <div className="service">
                  <Service key={obj.id} data={obj} />
                </div>
              );
            })
          : null}
      </div>
      <div className="ServiceTotal">
        <p className="ServiceTotalNum">{num} </p>
        <p className="ServiceTotalLabel"> Services Displayed</p>
      </div>
    </div>
  );
}

ServiceList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ServiceList;

// Node Module Imports
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// Local imports
import "./RecList.css";
// Other components
import RecService from "#components/RecService/RecService";

function RecList({ data }) {
  let num = 0;
  return (
    <div className="RecList">
      <h3>RecList</h3>
      <div className="allRecs">
        {data
          ? data.map((obj) => {
              num++;
              return <RecService key={obj.id} data={obj} />;
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

RecList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RecList;

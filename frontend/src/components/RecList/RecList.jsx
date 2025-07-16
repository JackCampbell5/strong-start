// Node Module Imports
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useState } from "react";

// Local imports
import "./RecList.css";
// Other components
import RecService from "#components/RecService/RecService";

function RecList({ data }) {
  let num = 0;
  const [serviceList, setServiceList] = useState(data);

  function doneAdded(id) {
    let updatedData = [...data];
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].id === id) {
        updatedData.splice(i, 1);
        break;
      }
    }
    setServiceList(updatedData);
  }
  return (
    <div className="RecList">
      <h3>RecList</h3>
      <div className="allRecs">
        {serviceList
          ? serviceList.map((obj) => {
              num++;
              return (
                <RecService key={obj.id} data={obj} doneAdded={doneAdded} />
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

RecList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RecList;

// Node Module Imports
import React, { use, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useState } from "react";

// Local imports
import "./RecList.css";
// Other components
import RecService from "#components/RecService/RecService";

function RecList({ data }) {
  const [serviceList, setServiceList] = useState(data);
  const [currentServices, setCurrentServices] = useState([]);
  const [successText, setSuccessText] = useState("");
  const [page, setPage] = useState(0);

  function changePage(newPage) {
    setPage(newPage);
    console.log(newPage);
    setCurrentServices(serviceList.slice(newPage * 10 - 10, newPage * 10));
  }

  /**
   * Removes the service from the list of services using the id of the service
   * + This will show a success message for 5 seconds and no longer show the service
   * @param {string} id - The id of the service that was added
   */
  function serviceAddedSuccessfully(id) {
    let updatedData = data.filter((item) => item.id !== id);
    setSuccessText("Service Added Successfully");
    setTimeout(() => {
      setSuccessText("");
    }, 5000);
    setServiceList(updatedData);
  }
  useEffect(() => {
    changePage(1);
  }, []);
  return (
    <div className="RecList">
      <p className="successText">{successText}</p>
      <div className="allRecs">
        {currentServices
          ? currentServices.map((obj) => {
              return (
                <RecService
                  key={obj.id}
                  data={obj}
                  serviceAddedSuccessfully={serviceAddedSuccessfully}
                />
              );
            })
          : null}
      </div>
      <div className="ServiceTotal">
        <p className="ServiceTotalNum">{currentServices.length} </p>
        <p className="ServiceTotalLabel"> Services on This Page</p>
      </div>
      <div className="pagination">
        <button
          className={page <= 1 ? "disabled" : undefined}
          onClick={() => {
            if (page > 1) {
              changePage(page - 1);
            }
          }}
        >
          Prev
        </button>
        <button
          className={page >= serviceList.length / 10 ? "disabled" : undefined}
          onClick={() => {
            if (page < serviceList.length / 10) {
              changePage(page + 1);
            }
          }}
        >
          Next
        </button>
        <div>
          Page {page} of {Math.ceil(serviceList.length / 10)}
          <br />
          Total Services: {serviceList.length}
        </div>
      </div>
    </div>
  );
}

RecList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RecList;

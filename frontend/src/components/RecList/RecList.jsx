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
  // Constant Variables
  const pageSize = 10;
  let highestPage = Math.ceil(data.length / pageSize);

  // State Variables
  const [serviceList, setServiceList] = useState(data);
  const [currentServices, setCurrentServices] = useState([]);
  const [successText, setSuccessText] = useState("");
  const [page, setPage] = useState(0);

  /**
   * Changes the page to the new page
   * @param {number} newPage - The page to change to
   */
  function changePage(newPage) {
    setPage(newPage);
    setCurrentServices(
      serviceList.slice(newPage * pageSize - pageSize, newPage * pageSize)
    );
  }

  /**
   * Removes the service from the list of services using the id of the service
   * + This will show a success message for 5 seconds and no longer show the service
   * @param {string} id - The id of the service that was added
   */
  function serviceAddedSuccessfully(id) {
    let updatedData = serviceList.filter((item) => item.id !== id);
    let updatedPage = currentServices.filter((item) => item.id !== id);

    setSuccessText("Service Added Successfully");
    setTimeout(() => {
      setSuccessText("");
    }, 5000);

    // Update the data/vars
    setServiceList(updatedData);
    setCurrentServices(updatedPage);
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
          className={page >= highestPage ? "disabled" : undefined}
          onClick={() => {
            if (page < highestPage) {
              changePage(page + 1);
            }
          }}
        >
          Next
        </button>
        <div>
          Page {page} of {highestPage}
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

import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import PropTypes, { func } from "prop-types";
import "./SelectService.css";

// Util functions
import { fetchServiceNameList } from "#fetch/serviceFetchUtils";
import { serviceNameInputDefault } from "#default-data/serviceDefaultData.js";
import { getNonProfit } from "#utils/pathUtils";

function SelectService({ setServiceID, setServiceName }) {
  {
    let nonprofit = getNonProfit();
    const [serviceList, setServiceList] = useState([serviceNameInputDefault]);

    function onSelectChange(e) {
      const value = e.target.value;
      setServiceID(value);
      const selectedIndex = e.target.selectedIndex;
      const selectedText = e.target.options[selectedIndex].text;
      setServiceName(selectedText);
    }

    useEffect(() => {
      fetchServiceNameList(nonprofit).then((data) => {
        if (data[0].id !== serviceNameInputDefault.id) {
          data = [serviceNameInputDefault, ...data];
        }
        setServiceList(data);
      });
    }, []);
    return (
      <div className="SelectService">
        <h2>What Service would you like to edit?</h2>
        <div className="selectService">
          <select onChange={onSelectChange} defaultValue={serviceList[0].id}>
            {serviceList.map((val) => {
              return (
                <option key={val.id} value={val.id} text={val.text}>
                  {val.text}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}

SelectService.propTypes = {
  setServiceID: PropTypes.func.isRequired,
  setServiceName: PropTypes.func.isRequired,
};

export default SelectService;

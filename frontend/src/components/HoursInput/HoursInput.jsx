// Node Module Imports
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// Local Imports
import "./HoursInput.css";
// Other Components
import TimeInput from "#components/TimeInput/TimeInput";
// Utils
import hoursDefault from "#default-data/hoursDefault.json";
import { createTime } from "#utils/hoursUtils";
import { serviceSearchIconMap } from "#utils/serviceIconUtils";

function HoursInput({ data, updateData }) {
  const [hoursData, setHoursData] = useState(hoursDefault);

  /**
   * Takes the new data and updates the hoursData array with it and then reformats and updates the parent component data
   * @param {object} dataGiven - The new data to update the hoursData array with
   * @param {string} type - The type of data to update (start or end)
   * @param {number} index - The index of the day in the hoursData array
   */
  function updateDataLocal(dataGiven, type, index) {
    const newData = [...hoursData];
    newData[index][type] = dataGiven;
    setHoursData(newData);
    reformatAndUpdateParent(newData);
  }

  /**
   * Formats the new data and updates the parent component data
   * @param {Array} newData - The new data to update the parent component data with
   */
  function reformatAndUpdateParent(newData) {
    const reformattedData = newData.map((obj) => ({
      start: createTime(obj.start),
      end: createTime(obj.end),
    }));
    updateData(reformattedData);
  }

  /**
   * Takes the hours object from the backend and ingests it into the hoursData array
   * @param {object} days - The days object to ingest into the hoursData array
   */
  function ingestHours(daysInput) {
    let days = [];
    for (const day in daysInput) {
      const inObj = daysInput[day];
      const outObj = hoursData[day];
      outObj.start = convertTime(inObj.start, outObj.start);
      outObj.end = convertTime(inObj.end, outObj.end);
      days.push(outObj);
    }
    setHoursData(days);
  }

  /**
   * Takes a string of a date object and converts it to the form required by the frontend
   * @param {String} inObj -  The string of a date object to convert to the form required by the frontend
   * @returns {object} - The date object in the form required by the frontend (hours, minutes, amPm)
   */
  function convertTime(inObj, hoursData) {
    const date = new Date(inObj);
    if (!isNaN(date)) {
      const hours = date.getUTCHours();
      const hoursAmPm = hours > 12 ? hours - 12 : hours;
      hoursData["hours"] = hoursAmPm === 0 ? "" : hoursAmPm;
      const minutes = date.getMinutes();
      hoursData["minutes"] = minutes === 0 ? "" : minutes;
      hoursData["amPm"] = hours > 12 ? "pm" : "am";
    }
    return hoursData;
  }

  useEffect(() => {
    if (data.value[0]?.end !== undefined) ingestHours(data.value);
    else reformatAndUpdateParent(hoursData); // Make sure the parent component at least has the default data
  }, [data]);
  return data ? (
    <div className="HoursInput">
      <div className="hoursInputHeader">
        <p>{data.name}</p>
        {data.icon
          ? React.createElement(serviceSearchIconMap[data.icon], {})
          : null}
      </div>
      {hoursData.map((obj, index) => {
        return (
          <div className="dayHours" key={index}>
            <p>{obj.name}</p>
            <TimeInput
              data={obj.start}
              updateData={(data) => updateDataLocal(data, "start", index)}
            />
            {" - "}
            <TimeInput
              data={obj.end}
              updateData={(data) => updateDataLocal(data, "end", index)}
            />
          </div>
        );
      })}
    </div>
  ) : null;
}

HoursInput.propTypes = {
  data: PropTypes.object.isRequired,
  updateData: PropTypes.func.isRequired,
};

export default HoursInput;

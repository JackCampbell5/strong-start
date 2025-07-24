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
import { createDatetimeString } from "#utils/hoursUtils";
import { serviceSearchIconMap } from "#utils/serviceIconUtils";

function HoursInput({ data, updateData }) {
  // State variables
  const [hoursData, setHoursData] = useState(hoursDefault);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Takes the new data and updates the hoursData array with it and then reformats and updates the parent component data
   * @param {object} dataGiven - The new data to update the hoursData array with
   * @param {string} type - The type of data to update (start or end)
   * @param {number} index - The index of the day in the hoursData array
   */
  function updateDataLocal(dataGiven, type, index) {
    const newData = [...hoursData];
    newData[index][type] = dataGiven;

    // Make sure the there is a start time if there is an end time and vice versa
    for (let dataIndex in newData) {
      if (
        existsAndNotZero(
          newData[dataIndex].start.hours,
          newData[dataIndex].end.hours
        ) ||
        existsAndNotZero(
          newData[dataIndex].end.hours,
          newData[dataIndex].start.hours
        )
      ) {
        setErrorMessage(
          "All days need to have a start and end time or be 0 or be blank"
        );
        break;
      } else {
        setErrorMessage("");
      }
    }
    setHoursData(newData);
    reformatAndUpdateData(newData);
  }

  /**
   * Checks if obj1 exists while obj2 does not or is zero
   * @param {object} obj1 - The object to check if it exists while other does not or is zero
   * @param {object} obj2 - The object to check if it is zero or does not exist while other exists
   * @returns true if obj1 exists while obj2 does not or is zero, false otherwise
   */
  function existsAndNotZero(obj1, obj2) {
    return obj1 && obj1 !== 0 && (!obj2 || obj2 === 0);
  }

  /**
   * Formats the new data and updates the parent component data
   * @param {Array} newData - The new data to update the parent component data with
   */

  function reformatAndUpdateData(newData) {
    const reformattedData = newData.map((obj) => ({
      start: createDatetimeString(obj.start),
      end: createDatetimeString(obj.end),
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
   * @param {String} inputDateString -  The string of a date object to convert to the form required by the frontend
   * @returns {object} - The date object in the form required by the frontend (hours, minutes, amPm)
   */
  function convertTime(inputDateString, hoursData) {
    const date = new Date(inputDateString);
    if (!isNaN(date)) {
      const hours = date.getUTCHours();
      hoursData["hours"] = hours > 12 ? hours - 12 : hours;
      hoursData["minutes"] = date.getMinutes();
      hoursData["amPm"] = hours > 12 ? "pm" : "am";
    }
    return hoursData;
  }

  useEffect(() => {
    if (data.value[0]?.end !== undefined) ingestHours(data.value);
    else reformatAndUpdateData(hoursData); // Make sure the parent component at least has the default data
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
      <p className="errorText">{errorMessage}</p>
    </div>
  ) : null;
}

HoursInput.propTypes = {
  data: PropTypes.object.isRequired,
  updateData: PropTypes.func.isRequired,
};

export default HoursInput;

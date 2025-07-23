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
   * Takes a time object and converts it to a date string to be returned to the backend
   * + Time objects should be in the format of {hours, minutes, amPm}
   * @param {obj} time - The time object to convert to a date
   * @returns {string} - The date string
   */
  function createTime(time) {
    const amPm = time.amPm;
    const hours = amPm === "am" ? time.hours : time.hours + 12;
    const minutes = time.minutes;
    const date = new Date(Date.UTC(0, 0, 0, hours || 0, minutes || 0));
    return date.toISOString();
  }

  /**
   * Takes the hours object from the backend and ingests it into the hoursData array
   * @param {object} days - The days object to ingest into the hoursData array
   */
  function ingestHours(daysInput) {
    let days = daysInput;
    for (const day in days) {
      const inObj = hours[day];
      const outObj = [...hoursData];
      outObj[day].start = convertTime(inObj.start);
      outObj[day].end = convertTime(inObj.end);
    }
    setHoursData(outObj);
  }

  /**
   * Takes a string of a date object and converts it to the form required by the frontend
   * @param {String} inObj -  The string of a date object to convert to the form required by the frontend
   * @returns {object} - The date object in the form required by the frontend (hours, minutes, amPm)
   */
  function convertTime(inObj) {
    const date = new Date(Date.UTC(inObj));
    const hours = date.getHours();
    return {
      hours: hours > 12 ? hours - 12 : hours,
      minutes: date.getMinutes(),
      amPm: hours > 12 ? "pm" : "am",
    };
  }

  useEffect(() => {
    if (data.value) ingestHours(data.value);
    else reformatAndUpdateParent(hoursData); // Make sure the parent component at least has the default data
  }, []);
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
};

export default HoursInput;

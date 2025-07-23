import React, { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./TimeInput.css";

function TimeInput({ data, updateData }) {
  const [errorText, setErrorText] = useState("");

  /**
   * Takes the value from the input and updates the data object. If the value is not a number or is greater than the max, sets an error text.
   * @param {Event} e - The event object.
   * @param {string} paramName - The name of the parameter to update.
   * @param {number} max - The maximum value for the parameter.
   * @returns
   */
  function checkAndUpdateData(e, paramName, max = null) {
    const value = e.target.value;
    if (
      max !== null &&
      value &&
      (isNaN(parseInt(value)) || parseInt(value) > max)
    ) {
      setErrorText(`${paramName} not < ${max}`);
      return;
    } else {
      setErrorText("");
    }
    const newData = { ...data };
    newData[paramName] = value;
    updateData(newData);
  }

  return (
    <div className="TimeInput">
      <div className="inputsAll">
        <input
          className={"hourInput"}
          type="text"
          value={data.hours}
          placeholder={"12"}
          onChange={(e) => {
            checkAndUpdateData(e, "hours", 12);
          }}
        />
        <strong>:</strong>
        <input
          className={"minuteInput"}
          type="text"
          value={data.minutes}
          placeholder={"00"}
          onChange={(e) => {
            checkAndUpdateData(e, "minutes", 60);
          }}
        />
        <select
          className={"amPmInput"}
          value={data.amPm}
          onChange={(e) => {
            checkAndUpdateData(e, "amPm");
          }}
        >
          <option value="am">AM</option>
          <option value="pm">PM</option>
        </select>
      </div>
      <div className="errorText">{errorText}</div>
    </div>
  );
}

TimeInput.propTypes = {
  data: PropTypes.object.isRequired,
  updateData: PropTypes.func.isRequired,
};

export default TimeInput;

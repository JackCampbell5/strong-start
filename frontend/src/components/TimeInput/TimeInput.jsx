import React, { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./TimeInput.css";

function TimeInput({ data, updateData }) {
  const [errorText, setErrorText] = useState("");

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
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <div className="errorText">{errorText}</div>
    </div>
  );
}

TimeInput.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default TimeInput;

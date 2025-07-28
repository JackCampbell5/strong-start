import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Select from "react-select";
import makeAnimated from "react-select/animated";

//Local Imports
import "./InputField.css";
// Other Components
import TimeInput from "#components/TimeInput/TimeInput";

// Utils
import { serviceSearchIconMap } from "#utils/serviceIconUtils";
import { createDatetimeString } from "#utils/hoursUtils";

function InputField({ obj, index, setValue }) {
  const animatedComponents = makeAnimated();

  return (
    <div className="InputField">
      <div className="serviceParamBody">
        <p className={obj.id + "P"}>{obj.name}:</p>
        {obj.icon
          ? React.createElement(serviceSearchIconMap[obj.icon], {})
          : null}{" "}
        {obj.type === "longText" ? (
          <textarea
            key={obj.id + "Input"}
            className={obj.id + "Input"}
            type="text"
            value={obj.value}
            placeholder={obj.default}
            onChange={(e) => {
              const value = e.target.value;
              setValue(index, value);
            }}
          />
        ) : obj.type === "dropdown" ? (
          <Select
            classNamePrefix="custom-select"
            closeMenuOnSelect={false}
            isMulti={true}
            options={obj.options}
            components={animatedComponents}
            onChange={(e) => {
              let value = e;
              if (e.length === 0) value = "";
              value = JSON.stringify(value);
              setValue(index, value);
            }}
          />
        ) : obj.type === "time" ? (
          <TimeInput
            data={obj.default}
            updateData={(dataReceived) => {
              const time = dataReceived.hours
                ? createDatetimeString(dataReceived)
                : "";

              setValue(index, time);
              setValue(index, dataReceived, "default");
            }}
          />
        ) : (
          <input
            key={obj.id + "Input"}
            className={obj.id + "Input"}
            type="text"
            value={obj.value}
            placeholder={obj.default}
            onChange={(e) => {
              const value = e.target.value;
              setValue(index, value);
            }}
          />
        )}
      </div>
      {obj.tooltip && <span className="tooltiptext">{obj.tooltip}</span>}
    </div>
  );
}

InputField.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default InputField;

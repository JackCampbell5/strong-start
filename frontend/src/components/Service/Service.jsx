// Node Module Imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MdArrowDropDownCircle } from "react-icons/md";

// Local Imports
import "./Service.css";
// Util Functions
import { addServiceView } from "#fetch/serviceFetchUtils";
import serviceDisplayDefault from "#default-data/serviceDisplayDefault.json";
import { fillMissingDataFields } from "#utils/selectUtils";
import { serviceSearchIconMap } from "#utils/serviceIconUtils";
import { getNonProfit } from "#utils/pathUtils";

/**
 *  A service component that displays info about a specific service a nonprofit has added
 * @param {object} data - Info on a specific service
 */
function Service({ inputData }) {
  // Constant Variables
  const nonprofit = getNonProfit();
  const hiddenFields = ["id", "addressInfo", "links", "nonprofit_ID"];
  const topFields = ["name", "description", "route_length", "ranking"];
  // State Variables
  const [serviceData, setServiceData] = useState({ bottom: [], top: [] });
  const [links, setLinks] = useState({});
  const [expanded, setExpanded] = useState(false);

  function onMoreDetailsClick() {
    setExpanded((pre) => !pre);
    if (inputData.nonprofit_ID) {
      addServiceView(nonprofit, inputData.id);
    }
  }

  /**
   * Divides the data based on what is on the topFields or not. Also makes sure the hiddenFields does not make into either array
   * @param {object} dataObj - The object to divide
   * @returns The divided data in the form [top, bottom, links]
   */
  function divideData(dataObj) {
    const data = JSON.parse(JSON.stringify(dataObj));
    let topData = [];
    let bottomData = [];
    for (const field in data) {
      if (topFields.includes(field)) {
        topData.push({ id: field, value: data[field] });
      } else if (!hiddenFields.includes(field)) {
        bottomData.push({ id: field, value: data[field] });
      }
    }
    return [topData, bottomData, data.links];
  }

  /**
   * Restructure the input data for display and then sets the data to that value
   * @param {obj} data - The data to restructure and then set
   */
  function restructureData(data) {
    // Divide the data
    const [topData, bottomData, links] = divideData(data);
    setLinks(links); // Set the links

    // Fill the fields to add icon and name
    const completeTop = fillMissingDataFields(topData, serviceDisplayDefault);
    const completeBottom = fillMissingDataFields(
      bottomData,
      serviceDisplayDefault
    );
    // Restructure the top for easier form to get
    let updatedTopData = completeTop.reduce((acc, obj) => {
      return { ...acc, [obj.id]: obj.value };
    }, {});
    const completeData = { top: updatedTopData, bottom: completeBottom };
    setServiceData(completeData);
  }

  useEffect(() => {
    restructureData(inputData);
  }, [inputData]);
  return (
    <div className={["Service", serviceData.top.name && "borderYes"].join(" ")}>
      <div className="serviceTop">
        <div className="topLeft">
          {serviceData.top.name ? <h3>{serviceData.top.name}</h3> : null}
          {serviceData.top.description ? (
            <p className="serviceDescription">{serviceData.top.description}</p>
          ) : null}
        </div>
        <div className="topRight">
          {serviceData.top.route_length ? (
            <div
              className={[
                "topParam",
                serviceData.top.route_length < 10
                  ? "greenOutline"
                  : serviceData.top.route_length < 20
                  ? "yellowOutline"
                  : "redOutline",
              ].join(" ")}
            >
              <div className="bigText">{serviceData.top.route_length}</div>
              <div className="smallText">Miles</div>
            </div>
          ) : null}
          {serviceData.top.ranking ? (
            <div
              className={[
                "topParam",
                serviceData.top.ranking > 75
                  ? "greenOutline"
                  : serviceData.top.ranking > 50
                  ? "yellowOutline"
                  : "redOutline",
              ].join(" ")}
            >
              <div className="bigText">
                {Math.round(serviceData.top.ranking)}%
              </div>
              <div className="smallText">Match</div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="serviceMid">
        <div
          onClick={onMoreDetailsClick}
          className={[
            "moreDetails",
            expanded ? "expanded" : "notExpanded",
          ].join(" ")}
        >
          More Details <MdArrowDropDownCircle />
        </div>
      </div>
      {expanded ? (
        <div className="serviceBottom">
          {serviceData.bottom.map((obj) => {
            return obj?.value ? (
              <div className="serviceParam" key={obj.id}>
                <strong>{obj.name}</strong>
                {obj.icon
                  ? React.createElement(serviceSearchIconMap[obj.icon], {})
                  : null}
                {":"}
                {obj.id === "address" ? (
                  <a href={links?.route} target="_blank">
                    {obj.value}
                  </a>
                ) : obj.id === "website" ? (
                  <a href={obj.value} target="_blank">
                    {obj.value}
                  </a>
                ) : obj.id === "hours" ? (
                  <span>{stringifyHours(obj.value)}</span>
                ) : (
                  <span>{obj.value}</span>
                )}
              </div>
            ) : null;
          })}
        </div>
      ) : null}
    </div>
  );
}

Service.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Service;

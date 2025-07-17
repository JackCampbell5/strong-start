// Node Module Imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MdArrowDropDownCircle } from "react-icons/md";

// Local Imports
import "./Service.css";
// Util Functions
import { fillMissingDataFields } from "#utils/selectUtils";
import serviceDisplayDefault from "#default-data/serviceDisplayDefault.json";

/**
 *  A service component that displays info about a specific service a nonprofit has added
 * @param {object} data - Info on a specific service
 */
function Service({ data }) {
  // Constant Variables
  const noShow = ["id", "addressInfo", "links", "nonprofit_ID"];
  const topFields = ["name", "description", "route_length", "ranking"];
  // State Variables
  const [serviceData, setServiceData] = useState({ bottom: [], top: [] });
  const [links, setLinks] = useState({});
  const [expanded, setExpanded] = useState(false);

  function divideData(data) {
    let topData = [];
    let bottomData = [];
    for (const field in data) {
      if (topFields.includes(field)) {
        topData.push({ id: field, value: data[field] });
      } else if (!noShow.includes(field)) {
        bottomData.push({ id: field, value: data[field] });
      }
    }
    let links = data.links;
    return [topData, bottomData, links];
  }

  useEffect(() => {
    const [topData, bottomData, links] = divideData(data);
    const completeTop = fillMissingDataFields(topData, serviceDisplayDefault);
    const completeBottom = fillMissingDataFields(
      bottomData,
      serviceDisplayDefault
    );
    let updatedTopData = completeTop.reduce((acc, obj) => {
      return { ...acc, [obj.id]: obj.value };
    }, {});
    const completeData = { top: updatedTopData, bottom: completeBottom };
    setServiceData(completeData);
    setLinks(links);
  }, [data]);
  return (
    <div className="Service">
      <div className="serviceTop">
        <div className="topLeft">
          {serviceData.top.name ? <h3>{serviceData.top.name}</h3> : null}
          {serviceData.top.description ? (
            <p className="serviceDescription">{serviceData.top.description}</p>
          ) : null}
        </div>
        <div className="topRight">
          {serviceData.top.route_length ? (
            <div className="topParam">
              <div className="bigText">{serviceData.top.route_length}</div>
              <div className="smallText">Miles</div>
            </div>
          ) : null}
          {serviceData.top.ranking ? (
            <div className="topParam">
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
          onClick={() => setExpanded((pre) => !pre)}
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
            return obj.value ? (
              <p className="serviceParam" key={obj.id}>
                <strong>{obj.name}:</strong>{" "}
                {obj.id === "address" ? (
                  <a href={links.route} target="_blank">
                    {obj.value}
                  </a>
                ) : (
                  <span>{obj.value}</span>
                )}
              </p>
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

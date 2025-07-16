// Node Module Imports
import React from "react";
import PropTypes from "prop-types";

// Local Imports
import "./Service.css";

/**
 *  A service component that displays info about a specific service a nonprofit has added
 * @param {object} data - Info on a specific service
 */
function Service({ data }) {
  const noShow = ["id", "name", "addressInfo", "routeLink", "nonprofit_ID"];
  return (
    <div className="Service">
      {data.name ? <h3>{data.name}</h3> : null}
      {Object.entries(data).map((obj) => {
        const key = obj[0]; // gets the key from obj.entries
        const info = obj[1]; // gets the string stored at the given key from obj.entries
        return !noShow.includes(key) && info ? (
          <p className="serviceParam" key={key} href={data.routeLink}>
            <strong>{key}:</strong>{" "}
            {key === "routeLength" ? (
              <a href={data["routeLink"]} target="_blank">
                {info}
              </a>
            ) : (
              <span>{info}</span>
            )}
          </p>
        ) : null;
      })}
    </div>
  );
}

Service.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Service;

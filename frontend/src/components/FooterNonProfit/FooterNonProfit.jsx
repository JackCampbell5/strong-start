// Node Module Imports
import React, { use, useEffect } from "react";
import PropTypes from "prop-types";

// Local Imports
import "./FooterNonProfit.css";

function FooterNonProfit({ data }) {
  const name = data.name;
  const email = data.email;
  const phone = data.phone;
  const address = data.address;
  const website = data.website;
  const logo = data.logo;

  return (
    <div className="FooterNonProfit">
      <p>{name}</p>
      <p>
        {phone} {email}
      </p>
      <p>{address}</p>
      <a href={website} target="_blank">
        {website}
      </a>
      <p>Contact: StrongStart@gmail.com with any questions</p>
    </div>
  );
}

FooterNonProfit.propTypes = {
  data: PropTypes.object.isRequired,
};

export default FooterNonProfit;

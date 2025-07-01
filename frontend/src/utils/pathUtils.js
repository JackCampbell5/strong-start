import { elementType } from "prop-types";
import { useLocation } from "react-router";

export const NpPages = Object.freeze({
  DASHBOARD: "dashboard",
  EDITSERVICE: "editservice",
  NEWSERVICE: "newservice",
  SEARCHSERVICE: "searchservice",
  VIEWSERVICES: "viewservices",
  LOGIN: "login",
  SIGNUP: "signup",
});

export function getLocation() {
  let location = useLocation().pathname;
  let allLocations = location.split("/");
  return allLocations[allLocations.length - 1];
}
/**
 * Gets the nonprofit name from the url bar
 * @returns  The name gotten from the url bar
 */
export function getNonProfit() {
  const params = new URLSearchParams(location.search);
  if (params.get("nonprofit") !== null) {
    return params.get("nonprofit");
  } else {
    return ""; // Figure out best way to handle this
  }
}

import { elementType } from "prop-types";
import { useLocation } from "react-router";

// An enum for all of the pages to allow for easy navigation and prevent typos
export const NpPages = Object.freeze({
  DASHBOARD: "dashboard",
  EDITSERVICE: "edit_service",
  NEWSERVICE: "new_service",
  SEARCHSERVICE: "search_service",
  VIEWSERVICES: "view_services",
  LOGIN: "login",
  REGISTER: "register",
});
export const RPages = Object.freeze({
  CONTACT: "contact",
  HOME: "home",
  ALLSERVICES: "allservices",
  HELP: "help",
});

export const OverallPages = Object.freeze({
  NONPROFIT: "nonprofit",
  REFUGEE: "refugee",
});

export const QueryParams = Object.freeze({
  NONPROFIT: "nonprofit",
});
/**
 * Gets the last part of the url bar to help with highlighting the correct nav bar item
 * @returns The last part of the url bar
 */
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
  const location = useLocation();
  const params = new URLSearchParams(location.search); // Update later
  if (params.get(QueryParams.NONPROFIT) !== null) {
    return params.get(QueryParams.NONPROFIT);
  } else {
    return ""; // Figure out best way to handle this
  }
}

export function createPageNavigator(navigate, location) {
  return (page) => {
    navigate({
      pathname: page,
      search: location.search, // Preserves existing query params
    });
  };
}

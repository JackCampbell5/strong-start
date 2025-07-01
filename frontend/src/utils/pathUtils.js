import { useLocation } from "react-router";

// An enum for all of the pages to allow for easy navigation and prevent typos
export const NpPages = Object.freeze({
  DASHBOARD: "dashboard",
  EDITSERVICE: "editservice",
  NEWSERVICE: "newservice",
  SEARCHSERVICE: "searchservice",
  VIEWSERVICES: "viewservices",
  LOGIN: "login",
  SIGNUP: "signup",
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

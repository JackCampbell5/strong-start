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

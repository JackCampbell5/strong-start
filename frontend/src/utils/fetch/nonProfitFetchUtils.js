import { statsDefault } from "#default-data/nonProfitDefaultData";
import nonprofitAllTest from "#test-data/nonprofitAllTest";
const nonProfitLink = import.meta.env.VITE_BACKEND_API + "/api/v1/nonprofit";

export async function fetchNonProfitStats(nonprofit) {
  return await fetch(`${nonProfitLink}/${nonprofit}/stats`)
    .then((response) => {
      console.log("response", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update the component with the data
      console.log("data", data);
      return data;
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching non-profit stats:", error);
    });
}

export async function fetchNonProfitList() {
  // return nonprofitAllTest;
  return await fetch(`${nonProfitLink}/all/short`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update the component with the data
      console.log("data", data);
      return data;
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching all non-profits :", error);
    });
}

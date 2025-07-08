import { getNonProfit } from "#utils/pathUtils";
import { statsDefault } from "#default-data/nonProfitDefaultData";
import nonprofitAllTest from "#test-data/nonprofitAllTest";
const nonProfitLink = import.meta.env.VITE_BACKEND_API + "/api/v1/nonprofit";

export async function fetchNonProfitStats() {
  let nonProfit = getNonProfit();
  return statsDefault;
  // Temp until frontend connects to backend
  // await fetch(`${nonProfit}${id}/stats`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json(); // Parse JSON data from the response
  //     })
  //     .then((data) => {
  //       // Update the component with the data
  //       after(data);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error fetching non-profit stats:", error);
  //     });
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

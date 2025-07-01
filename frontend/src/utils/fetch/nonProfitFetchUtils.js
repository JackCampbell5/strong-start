import { getNonProfit } from "#utils/pathUtils";
import { statsDefault } from "#default-data/nonProfitDefaultData";
const nonProfitLink = import.meta.env.VITE_BACKEND_API;

export async function fetchNonProfitStats(after) {
  let nonProfit = getNonProfit();
  after(statsDefault);
  // Temp until frontend connects to backend
  // await fetch(`${nonProfit}${id}/stats`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json(); // Parse JSON data from the response
  //     })
  //     .then((data) => {
  //       // Update UI or perform other actions with the data
  //       after(data);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error fetching non-profit stats:", error);
  //       // Display an error message or retry the request
  //     });
}

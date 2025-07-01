import { getNonProfit } from "#utils/pathUtils";
const nonProfitLink = import.meta.env.VITE_BACKEND_API;

export async function fetchNonProfitStats(after) {
  let nonProfit = getNonProfit();
  const statsDefault = {
    servicesNumber: { name: "Services #", key: 2 },
    servicesOffered: { name: "Services offered", key: 30 },
    popularZipCode: { name: "Popular Zip Codes", key: 40 },
    servicesOffered2: { name: "Cost", key: 80 },
  };
  after(statsDefault);
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

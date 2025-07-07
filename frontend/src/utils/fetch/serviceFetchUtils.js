import { getNonProfit } from "#utils/pathUtils";
import { serviceInputDefaultData } from "#default-data/serviceDefaultData";
const serviceLink = import.meta.env.VITE_BACKEND_API + "/service";

/**
 * Gets all of a specified services information
 * @param {string} id - The id to get the services for
 * @param {Function} after - Function to call with data fetched
 */
export async function fetchServiceDetails(id) {
  let nonProfit = getNonProfit();
  return serviceInputDefaultData;
  // Temp until frontend connects to backend
  // await fetch(`${serviceLink}/${nonProfit}/${id}`)
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
  //       console.error("Error fetching given service:", error);
  //     });
}

/**
 * Gets a list of all services for a nonprofit with just the name and id
 * @param {Function} after - Function to call with data fetched
 */
export async function fetchServiceNameList(after) {
  let nonProfit = getNonProfit();
  after([{ id: 100, text: "Test Service" }]);
  // TODO Temp until frontend connects to backend
  // await fetch(`${serviceLink}/${nonProfit}/name-list`)
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
  //       console.error("Error fetching given service:", error);
  //     });
}

/**
 * Creates a new service for a nonprofit
 * @param {object} info - The info to post to the backend
 * @param {*} after  - Function to call with data fetched
 */
export async function postService(info, after) {
  let nonProfit = getNonProfit();
  after(true);
  //   // Temp until frontend connects to backend
  //   await fetch(`${serviceLink}/${nonProfit}/add`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(info),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json(); // Parse JSON data from the response
  //     })
  //     .then((data) => {
  //       // Update now that success
  //       after("");
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error fetching boards:", error);
  //       // Return more info on the error
  //       after();
  //     });
}

/**
 * Updates a new service for a nonprofit
 * @param {object} info - The info to post to the backend
 * @param {*} after  - Function to call with data fetched
 */
export async function putService(info, after) {
  let nonProfit = getNonProfit();
  after(true);
  //   // Temp until frontend connects to backend
  //   await fetch(`${serviceLink}/${nonProfit}/add`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(info),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json(); // Parse JSON data from the response
  //     })
  //     .then((data) => {
  //       // Update now that success
  //       after("");
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error fetching boards:", error);
  //       // Return more info on the error
  //       after();
  //     });
}

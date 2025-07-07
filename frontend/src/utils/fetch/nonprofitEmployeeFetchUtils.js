import { getNonProfit } from "#utils/pathUtils";
const serviceLink = import.meta.env.VITE_BACKEND_API + "/nonprofit-employee";

/**
 * Creates a new service for a nonprofit
 * @param {object} info - The info to post to the backend
 */
export async function loginNonprofitEmployee(username, password) {
  let nonProfit = getNonProfit();
  return { success: true, message: "Logged in" };
  //   // Temp until frontend connects to backend
  //   await fetch(`${serviceLink}/${nonProfit}/login`, {
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
  //       return data;
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error fetching boards:", error);
  //       // Return more info on the error
  //       return data;
  //     });
}
/**
 * Creates a new service for a nonprofit
 * @param {object} info - The info to post to the backend
 * @param {*} after  - Function to call with data fetched
 */
export async function registerNonprofitEmployee(data, after) {
  let nonProfit = getNonProfit();
  after({ success: true, message: "Register Success" });
  //   // Temp until frontend connects to backend
  //   await fetch(`${serviceLink}/${nonProfit}/register`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json(); // Parse JSON data from the response
  //     })
  //     .then((data) => {
  //       // Update now that success
  //       after(data);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error fetching boards:", error);
  //       // Return more info on the error
  //       after();
  //     });
}

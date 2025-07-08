import { getNonProfit } from "#utils/pathUtils";
import serviceSearchTestData from "#test-data//serviceSearchTestData";
import serviceInputDefaultData from "#default-data/serviceInputDefaultData.json";
const serviceLink = import.meta.env.VITE_BACKEND_API + "/api/v1/service";

/**
 * Gets all of a specified services information
 * @param {string} id - The id to get the services for
 */
export async function fetchServiceDetails(nonProfit, id) {
  return await fetch(`${serviceLink}/${nonProfit}/${id}/get-edit`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      console.log(data);
      // Update the component with the data
      return data;
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching given service:", error);
    });
}

/**
 * Gets a list of all services for a nonprofit with just the name and id
 * @param {Function} after - Function to call with data fetched
 */
export async function fetchServiceNameList(nonProfit) {
  return await fetch(`${serviceLink}/${nonProfit}/all/name-list`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update the component with the data
      return data;
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching given service:", error);
    });
}

/**
 * Creates a new service for a nonprofit
 * @param {object} info - The info to post to the backend
 * @param {*} after  - Function to call with data fetched
 */
export async function postService(info, nonprofit) {
  return await fetch(`${serviceLink}/${nonprofit}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: info }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new Error(`${errorText}`);
      }
      let data = response.json(); // Parse JSON data from the response
      return { result: true };
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching boards:", error);
      // Return more info on the error
      return { result: false, error: error.message };
    });
}

/**
 * Updates a new service for a nonprofit
 * @param {object} info - The info to post to the backend
 * @param {*} after  - Function to call with data fetched
 */
export async function putService(info, after) {
  after(true);
  //   // TODO will uncomment once frontend connects to backend
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

/**
 * Gets a list of all services for a nonprofit with just the name and id
 * @param {Function} after - Function to call with data fetched
 */
export async function fetchSearch(data) {
  return { valid: true, data: serviceSearchTestData };
  // Add the data as query params
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
 *
 * @returns An object containing all the services in this non profits database
 */
export async function fetchAllServices() {
  return { valid: true, data: serviceSearchTestData };
  // Add the data as query params
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

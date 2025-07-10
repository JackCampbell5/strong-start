import { getNonProfit } from "#utils/pathUtils";
import serviceSearchTestData from "#test-data//serviceSearchTestData";
import serviceInputDefaultData from "#default-data/serviceInputDefaultData.json";
const serviceLink = import.meta.env.VITE_BACKEND_API + "/api/v1/service";

/**
 * Gets all of a specified services information
 * @param {string} id - The id to get the services for
 */
export async function fetchServiceDetails(nonProfit, id) {
  return await fetch(`${serviceLink}/${nonProfit}/${id}/get-to-edit`)
    .then((response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new Error(`${errorText}`);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update the component with the data
      return { valid: true, data: data };
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching given service:", error.message);
      return { valid: false, error: error.message };
    });
}

/**
 * Gets a list of all services for a nonprofit with just the name and id
 * @param {Function} after - Function to call with data fetched
 */
export async function fetchServiceNameList(nonProfit) {
  return await fetch(`${serviceLink}/${nonProfit}/all/name-list`)
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new Error(`${errorText}`);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update the component with the data
      return { valid: true, data: data };
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching given service:", error.message);
      return { valid: false, error: error.message };
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
export async function putService(info, nonprofit, serviceID) {
  return await fetch(`${serviceLink}/${nonprofit}/${serviceID}/edit`, {
    method: "PUT",
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
 * Gets a list of all services for a nonprofit with just the name and id
 * @param {Function} after - Function to call with data fetched
 */
export async function fetchSearch(nonprofit, data) {
  // Construct the query params based on the search data
  const params = new URLSearchParams(data);
  return await fetch(`${serviceLink}/${nonprofit}/search?${params.toString()}`)
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new Error(`${errorText}`);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update the component with the data
      return { valid: true, data: data };
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching given service:", error);
      return { valid: false, error: error.message };
    });
}

/**
 *
 * @returns An object containing all the services in this non profits database
 */
export async function fetchAllServices(nonprofit) {
  // return { valid: true, data: serviceSearchTestData };
  return await fetch(`${serviceLink}/${nonprofit}/all`)
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new Error(`${errorText}`);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update the component with the data
      return { valid: true, data: data };
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching given service:", error);
      return { valid: false, error: error.message };
    });
}

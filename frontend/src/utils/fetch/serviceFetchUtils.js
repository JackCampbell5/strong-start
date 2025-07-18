import { getNonProfit } from "#utils/pathUtils";
import { errorReturn, successReturn, MyHTTPError } from "#utils/httpUtils";
import serviceSearchTestData from "#test-data//serviceSearchTestData";
const serviceLink = import.meta.env.VITE_BACKEND_API + "/api/v1/service";

/**
 * Gets all of a specified services information
 * @param {string} id - The id to get the services for
 * @return {object} - Object with the the service with details or an error
 */
export async function fetchServiceDetails(nonProfit, id) {
  return await fetch(`${serviceLink}/${nonProfit}/${id}/get-edit`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new MyHTTPError(response.status, errorText);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update the component with the data
      return successReturn(data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching given service:", error.message);
      return errorReturn(error);
    });
}

/**
 * Gets a list of all services for a nonprofit with just the name and id
 * @param {object} nonProfit - The non profit to get the services for
 * @return {object} - Object with the list of services with just id and name or an error
 */
export async function fetchServiceNameList(nonProfit) {
  return await fetch(`${serviceLink}/${nonProfit}/all/name-list`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new MyHTTPError(response.status, errorText);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update the component with the data
      return successReturn(data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching given service:", error.message);
      return errorReturn(error);
    });
}

/**
 * Gets a list of all filters for a given nonprofit
 * @param {Function} nonprofit - The non profit to get the filters for
 * @return {object} - Object with the list of filters or an error
 */
export async function fetchServiceFilters(nonprofit) {
  return await fetch(`${serviceLink}/${nonprofit}/filters`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new MyHTTPError(response.status, errorText);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update the component with the data
      return successReturn(data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching given service:", error.message);
      return errorReturn(error);
    });
}

/**
 * Creates a new service for a nonprofit
 * @param {object} info - The info to post to the backend
 * @param {object} nonProfit - The non profit to add the service to
 * @return {object} - Object with true or an error
 */
export async function postService(info, nonprofit) {
  return await fetch(`${serviceLink}/${nonprofit}/add`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: info }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new MyHTTPError(response.status, errorText);
      }
      const data = response.json(); // Parse JSON data from the response
      return successReturn();
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching boards:", error);
      // Return more info on the error
      return errorReturn(error);
    });
}

/**
 * Updates a new service for a nonprofit
 * @param {object} info - The info to post to the backend
 * @param {object} nonProfit - The non profit to update the service of
 * @param {string} serviceID - The id of the service to update
 * @return {object} - Object with true or an error
 */
export async function putService(info, nonprofit, serviceID) {
  return await fetch(`${serviceLink}/${nonprofit}/${serviceID}/edit`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: info }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new MyHTTPError(response.status, errorText);
      }
      const data = response.json(); // Parse JSON data from the response
      return successReturn();
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching boards:", error);
      // Return more info on the error
      return errorReturn(error);
    });
}

/**
 * Adds a view to a service
 * @param {object} nonprofit - The nonprofit containing the service to add a view to
 * @param {String} serviceID - The id of the service to add a view to
 * @returns
 */
export async function addServiceView(nonprofit, serviceID) {
  return await fetch(`${serviceLink}/${nonprofit}/${serviceID}/view-add`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new MyHTTPError(response.status, errorText);
      }
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
 * @param {object} nonProfit - The non profit to search for services in
 * @param {object} data - The data to search for as query params
 * @return {object} - Object with the list of services or an error
 */
export async function fetchSearch(nonprofit, data) {
  // Construct the query params based on the search data
  const params = new URLSearchParams(data);
  return await fetch(
    `${serviceLink}/${nonprofit}/search?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new MyHTTPError(response.status, errorText);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update the component with the data
      return successReturn(data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching given service:", error);
      return errorReturn(error);
    });
}

/**
 * Gets a list of all services for a nonprofit
 * @param {object} nonProfit - The non profit to fetch services for
 * @returns An object containing all the services in this non profits database
 */
export async function fetchAllServices(nonprofit) {
  return await fetch(`${serviceLink}/${nonprofit}/all`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new MyHTTPError(response.status, errorText);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update the component with the data
      return successReturn(data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching given service:", error);
      return errorReturn(error);
    });
}

/**
 * Gets a list of all services recommended for a given nonprofit
 * @param {object} nonProfit - The non profit to search services in
 * @returns An object containing all the services that are recommended for this non profit
 */
export async function fetchRecs(nonprofit) {
  // TODO change from all to recommend when backend endpoint is created
  return await fetch(`${serviceLink}/${nonprofit}/recommend`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new MyHTTPError(response.status, errorText);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update the component with the data
      return successReturn(data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching given service:", error);
      return errorReturn(error);
    });
}

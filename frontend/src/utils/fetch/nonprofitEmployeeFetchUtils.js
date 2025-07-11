import { getNonProfit } from "#utils/pathUtils";
import { errorReturn, successReturn, MyHTTPError } from "#utils/httpUtils";
const serviceLink =
  import.meta.env.VITE_BACKEND_API + "/api/v1/nonprofit-employee";

/**
 * Creates a new service for a nonprofit
 * @param {object} info - The info to post to the backend
 */
export async function loginNonprofitEmployee(nonprofit, username, password) {
  let data = { data: { username: username, password: password } };
  return await fetch(`${serviceLink}/${nonprofit}/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new MyHTTPError(response.status, errorText);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update now that success
      return successReturn("Welcome " + data.username);
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching boards:", error);
      // Return more info on the error
      return errorReturn(error);
    });
}

export async function checkEmployeeLoginStatus(nonprofit) {
  return await fetch(`${serviceLink}/${nonprofit}/login/test`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new MyHTTPError(response.status, errorText);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update now that success
      return successReturn(data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching boards:", error);
      // Return more info on the error
      return errorReturn(error);
    });
}

/**
 * Creates a new service for a nonprofit
 * @param {object} info - The info to post to the backend
 */
export async function registerNonprofitEmployee(nonprofit, data) {
  return await fetch(`${serviceLink}/${nonprofit}/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: data }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new MyHTTPError(response.status, errorText);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update now that success
      return successReturn("User created " + data.username);
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching boards:", error);
      // Return more info on the error
      return errorReturn(error);
    });
}

export async function logoutNonprofitEmployee(nonprofit) {
  return await fetch(`${serviceLink}/${nonprofit}/logout`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new MyHTTPError(response.status, errorText);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update now that success
      return successReturn(data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching boards:", error);
      // Return more info on the error
      return errorReturn(error);
    });
}

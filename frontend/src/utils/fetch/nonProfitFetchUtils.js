import { statsDefault } from "#default-data/nonProfitDefaultData";
import nonprofitAllTest from "#test-data/nonprofitAllTest";
import { errorReturn, successReturn, MyHTTPError } from "#utils/httpUtils";
const nonProfitLink = import.meta.env.VITE_BACKEND_API + "/api/v1/nonprofit";

export async function fetchNonProfitStats(nonprofit) {
  return await fetch(`${nonProfitLink}/${nonprofit}/stats`, {
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
      // Update the component with the data
      return successReturn(data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching non-profit stats:", error);
      return errorReturn(error);
    });
}

export async function fetchNonProfitList() {
  // return nonprofitAllTest;
  return await fetch(`${nonProfitLink}/all/short`)
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
      console.error("Error fetching all non-profits :", error);
      return errorReturn(error);
    });
}

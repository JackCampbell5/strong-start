import { statsDefault } from "#default-data/nonProfitDefaultData";
import nonprofitAllTest from "#test-data/nonprofitAllTest";
const nonProfitLink = import.meta.env.VITE_BACKEND_API + "/api/v1/nonprofit";

export async function fetchNonProfitStats(nonprofit) {
  return await fetch(`${nonProfitLink}/${nonprofit}/stats`)
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
      console.error("Error fetching non-profit stats:", error);
      return { valid: false, error: error.message };
    });
}

export async function fetchNonProfitList() {
  // return nonprofitAllTest;
  return await fetch(`${nonProfitLink}/all/short`)
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new Error(`${errorText}`);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      // Update the component with the data
      return data;
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching all non-profits :", error);
    });
}

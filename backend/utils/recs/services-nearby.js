import { errorReturn, successReturn } from "#utils/validate-utils.js";

const googleApiKey = process.env.MAPS_API_KEY;
/**
 * + API Used: https://developers.google.com/maps/documentation/places/web-service/text-search
 *  * @param {object} nonprofit - The nonprofit to get services around
 * @returns
 */
export default async function servicesNearby(nonprofit) {
  const searchURL = "https://places.googleapis.com/v1/places:searchText";
  const nonprofitGiven = nonprofit !== null;

  // Data for the POST request
  let data = getNearbyRequestBody(nonprofit.addressInfo);
  let mask = getNearbyRequestMask();

  return await fetch(`${searchURL}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": googleApiKey,
      "X-Goog-FieldMask": mask,
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new Error(`${response.status}, ${errorText}`);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      return successReturn(data);
    })
    .catch((error) => {
      // Handle error
      return errorReturn(error.message); // Return an error object
    });
}

function getNearbyRequestBody(location) {
  return {
    locationBias: {
      circle: {
        center: location.location,
        radius: 5000, // 5km
      },
    },
    maxResultCount: 5,
    textQuery: "nonprofit",
  };
}

/**
 *
 * Still need to get "email, language, date_needed, services_offered, restrictions, next_steps"
 * @returns
 */
function getNearbyRequestMask() {
  return [
    "places.id", // ID
    "places.displayName", // Name
    "places.formattedAddress", // Address
    "places.postalAddress", // Extract zipcode
    "places.editorialSummary", // Description
    "places.nationalPhoneNumber", //phone
    "places.websiteUri", //website
    "places.regularOpeningHours", //hours
    "places.iconBackgroundColor", // Logo color
    "places.iconMaskBaseUri", //logo
    "places.types", //categories
    "places.reviews",
  ].join(",");
}

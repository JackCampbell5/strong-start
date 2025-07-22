import { errorReturn, successReturn } from "#utils/validate-utils.js";

const googleApiKey = process.env.MAPS_API_KEY;
/**
 * Searches nearby the nonprofits current headquarters for other nonprofits to possible add as services
 * + API Used: https://developers.google.com/maps/documentation/places/web-service/text-search
 *  * @param {object} nonprofit - The nonprofit to get services around
 * @returns {object} - The response from the API containing the services suggested
 */
export default async function servicesNearby(nonprofit) {
  // Find nearby services (Look thru the 3 pages that google places API returns)
  let apiServices = [];
  let pageToken = null;
  for (let a = 0; a < 3; a++) {
    let result = await getServicesNearbyPage(nonprofit, pageToken);
    if (!result.valid) {
      console.log("Error: ", result.error);
    } else {
      apiServices = apiServices.concat(result.data.places);
      pageToken = result.data.nextPageToken;
    }
  } // End for loop
  return apiServices;
}

/**
 * Gets a page of results from the nearby search API for a given nonprofit
 * + API Used: https://developers.google.com/maps/documentation/places/web-service/text-search
 * @param {object} nonprofit - The nonprofit to get services around
 * @param {string} pageToken - The page token to get the next page of results if applicable
 */
async function getServicesNearbyPage(nonprofit, pageToken = null) {
  const searchURL = "https://places.googleapis.com/v1/places:searchText";

  // Data for the POST request
  let data = getNearbyRequestBody(nonprofit.addressInfo, pageToken);
  let mask = getNearbyRequestMask();
  // let queryParams = new URLSearchParams({ queryString });

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

/**
 * Creates the body of the POST request to the searchText API
 * @param {object} location-  The location to search around (Usually the nonprofit's address) in the format {location: {latitude: number, longitude: number}}
 * @returns The body of the POST request to the nearby search API
 */
function getNearbyRequestBody(location, pageToken = null) {
  return {
    locationBias: {
      circle: {
        center: location.location,
        radius: 50000, // 50km
      },
    },
    pageToken: pageToken,
    textQuery: "nonprofit",
  };
}

/**
 * Creates the mask of the POST request to the searchText API
 * Still need to get "email, language, date_needed, services_offered, restrictions, next_steps"
 * @returns The mask as a string
 */
function getNearbyRequestMask() {
  return [
    "nextPageToken",
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

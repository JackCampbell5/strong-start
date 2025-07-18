import { errorReturn, successReturn } from "#utils/validate-utils.js";

const googleApiKey = process.env.MAPS_API_KEY;

/**
 * Find the length of the route between two addresses in miles using the Google Maps API
 * @param {*} initialAddress The address object for the starting point
 * @param {*} endingAddress - The address object for the ending point
 * @returns
 */
export async function routeBetween(initialAddress, endingAddress) {
  let routeUrl = "https://routes.googleapis.com/directions/v2:computeRoutes";

  // Data for the POST request
  let data = getRouteRequestBody(initialAddress, endingAddress);
  let mask = getRouteRequestMask();

  return await fetch(`${routeUrl}`, {
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
      let len = validateAndExtractRouteLength(data);
      return successReturn(len);
    })
    .catch((error) => {
      // Handle error
      return errorReturn(error.message); // Return an error object
    });
}

/**
 *  Takes the data object returned from the Google Maps API and extracts the route length in miles
 * @param {object} data - The data object returned from the Google Maps API
 * @returns The route length in miles as a string
 */
function validateAndExtractRouteLength(data) {
  const milesDist = metersToMiles(data.routes[0].distanceMeters, 1);
  return milesDist;
}

/**
 * Converts meters to miles with the given number of decimal places
 * @param {number} meters - The number of meters to convert to miles
 * @param {number} places - The number of decimal places to round to
 * @returns
 */
function metersToMiles(meters, places) {
  const metersToMilesConversion = 0.000621371; // Convert meters to miles
  let inMiles = meters * metersToMilesConversion;
  if (places) {
    inMiles = inMiles.toFixed(places);
  }
  return inMiles;
}

function getRouteRequestBody(refugeeAddress, serviceAddress) {
  let encodedRefugeeAddress = { location: { latLng: refugeeAddress.location } };
  let encodedServiceAddress = { location: { latLng: serviceAddress.location } };
  return {
    origin: encodedRefugeeAddress,
    destination: encodedServiceAddress,
    travelMode: "DRIVE",
    computeAlternativeRoutes: false,
    routeModifiers: {
      avoidTolls: false,
      avoidHighways: false,
      avoidFerries: false,
    },
    languageCode: "en-US",
  };
}
/**
 * Creates a mask for the fields to be returned from the Google Maps API. Starts as a array of strings for easy viewing
 * @returns A string of the fields to be returned from the Google Maps API
 */
function getRouteRequestMask() {
  let mask = [
    "routes.duration",
    "routes.distanceMeters",
    "routes.polyline.encodedPolyline",
  ];
  return mask.join(",");
}

/**
 * Creates a link to the Google Maps directions page between two addresses
 * @param {*} initialAddress The address object for the starting point
 * @param {*} endingAddress - The address object for the ending point
 * @returns The created link
 */
export function createDirectionLink(initialAddressObj, endingAddressObj) {
  let initialAddress = initialAddressObj.formattedAddress;
  let endingAddress = endingAddressObj.formattedAddress;
  const directionsURL = "https://www.google.com/maps/dir/";
  const params = new URLSearchParams();
  params.append("api", 1);
  params.append("origin", initialAddress);
  params.append("destination", endingAddress);
  const queryString = params.toString();
  return `${directionsURL}?${queryString}`;
}

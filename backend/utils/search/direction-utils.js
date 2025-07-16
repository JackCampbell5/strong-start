import { errorReturn, successReturn } from "#utils/validate-utils.js";

const googleApiKey = process.env.MAPS_API_KEY;
export async function routeBetween(address1, address2) {
  let routeUrl = "https://routes.googleapis.com/directions/v2:computeRoutes";

  // Data for the POST request
  let data = getRouteRequestBody(address1, address2);
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

function validateAndExtractRouteLength(data) {
  const metersToMiles = 0.000621371; // Convert meters to miles
  const milesDist = data.routes[0].distanceMeters * metersToMiles;
  const roundMiles = Math.round(milesDist * 100) / 100;
  return roundMiles.toString() + " Miles";
}

function getRouteRequestBody(refugeeAddress, serviceAddress) {
  let encodedRefugeeAddress = { location: { latLng: refugeeAddress.location } };
  let encodedServiceAddress = { location: { latLng: serviceAddress.location } };
  return {
    origin: encodedRefugeeAddress,
    destination: encodedServiceAddress,
    travelMode: "DRIVE",
    routingPreference: "TRAFFIC_AWARE",
    computeAlternativeRoutes: false,
    routeModifiers: {
      avoidTolls: false,
      avoidHighways: false,
      avoidFerries: false,
    },
    languageCode: "en-US",
  };
}

function getRouteRequestMask() {
  let mask = [
    "routes.duration",
    "routes.distanceMeters",
    "routes.polyline.encodedPolyline",
  ];
  return mask.join(",");
}

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

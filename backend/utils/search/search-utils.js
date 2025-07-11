const googleApiKey = process.env.MAPS_API_KEY;

export async function formatAddress(address, nonprofit = {}) {
  const searchURL = "https://places.googleapis.com/v1/places:searchText";

  let data = { textQuery: address, languageCode: "en" };
  let mask = [
    "places.shortFormattedAddress",
    "places.displayName",
    "places.containingPlaces",
    "places.formattedAddress",
    "places.name",
    "places.location",
    "places.postalAddress",
  ].join(",");

  // Add the location restriction if the nonprofit has a location
  if ((nonprofit.length === 0) & nonprofit.addressInfo) {
    const info = nonprofit.addressInfo.json();
    const location = info?.location;
    if (location !== undefined) {
      const latLong = {
        latitude: location?.latitude,
        longitude: location?.longitude,
      };
      data.locationRestriction = { latLong: latLong, radius: 50000.0 };
    }
  }
  const result = await fetch(`${searchURL}`, {
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
      return data.places[0]; // Return the actual data instead of a container
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching address:", error);
      // Return more info on the error
    });
  return result;
}

export function extractZipcode(address) {
  const addressRegex = /(\d{5}?(?:\-\d{4}))(?:\s|$)/;
  const matches = address.match(addressRegex);
  if (matches) {
    return matches[0];
  } else {
    return null;
  }
}

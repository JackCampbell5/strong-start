const googleApiKey = process.env.MAPS_API_KEY;

export async function formatAddress(address, nonprofit={}) {
    console.log("Validating address: " + address);
    const searchURL = "https://places.googleapis.com/v1/places:searchText";

    let data = { textQuery: address, languageCode: "en", locationRestriction: nonprofit. }
    if(nonprofit.length ===0){
        data.locationRestriction =
    }

  const result = await fetch(`${searchURL}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": googleApiKey,
      "X-Goog-FieldMask": places.formattedAddress,
    },
    body: JSON.stringify({ textQuery: address, languageCode: "en", locationRestriction: nonprofit. }),
  }).then((res) => res.json());
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

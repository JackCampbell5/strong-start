export async function validateAddress(address) {
  console.log("Validating address: " + address);
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

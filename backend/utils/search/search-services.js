// Node Module Imports
import { PrismaClient } from "#prisma/client.js";
const prisma = new PrismaClient();

// Local Imports
import { validateAddress, extractZipcode } from "#search/search-utils.js";

export default async function searchServices(query, nonprofit) {
  // Params that can be used for search
  const address = query.address;
  const services_needed = query.services_needed;
  const country_of_origin = query.country_of_origin;
  const language = query.language;
  const date_entered = query.date_entered;
  const family_members = query.family_members;

  const zipCode = extractZipcode(address);
  let errorMessage = "";
  if (zipCode === null) {
    errorMessage +=
      "Invalid Zipcode. Please provide a zipcode in your address in the form of 12345 or 12345-1234.";
  }
  if (errorMessage !== "") {
    console.log(errorMessage);
    return { valid: false, error: errorMessage };
  }

  const addressValid = validateAddress(address);
  const foundServices = await prisma.service.findMany({
    where: {
      nonprofit_ID: nonprofit.id,
    },
  });
  return { valid: true, data: foundServices };
}

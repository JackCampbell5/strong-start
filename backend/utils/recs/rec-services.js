// Node Module Imports
import { PrismaClient } from "#prisma/client.js";
const prisma = new PrismaClient();

// Local Imports
import { errorReturn, successReturn } from "#utils/validate-utils.js";
import servicesNearby from "#recs/services-nearby.js";
import { reformatServices } from "#recs/rec-utils.js";
import rankServicesByKeyword from "#recs/rank-by-keyword.js";

/**
 * Takes a nonprofit and finds additional services nearby
 * + Uses the google places API to find nearby nonprofits and reformats the data and returns it
 * @param {object} nonprofit - The nonprofit to find additional services for
 * @returns {Array} - The reformatted services nearby
 */
export default async function recServices(nonprofit) {
  // Find nearby services
  let result = await servicesNearby(nonprofit);
  if (!result.valid) {
    return errorReturn(result.error);
  }

  const apiServices = result.data.places;

  // Reformat the services
  const reformattedServices = reformatServices(apiServices);

  // Remove Duplicates Services Already in Database
  const servicesNoDups = await removeServiceDuplicates(
    reformattedServices,
    nonprofit
  );

  // Rank the services by keyword
  const serviceKeywordRanked = await rankServicesByKeyword(servicesNoDups);

  return successReturn(serviceKeywordRanked);
}

/**
 * Removes duplicate services from the API
 * + Compares name, zipcode, and address to see if the service already exists in the database
 * + If it does, it is removed from the array
 *
 * @param {Array} apiServices - The services from the API
 * @param {object} nonprofit - The nonprofit to find the duplicate services in
 * @returns Array - The services without database duplicates
 */
async function removeServiceDuplicates(apiServices, nonprofit) {
  if (!apiServices) return [];
  let existedServices = await prisma.service.findMany({
    where: {
      nonprofit_ID: nonprofit.id,
    },
  });
  const existedPhoneNumbers = getAllOfKey(existedServices, "phone_number");
  const existedNames = getAllOfKey(existedServices, "name");
  const existedAddresses = getAllOfKey(existedServices, "address");

  let servicesNoDups = [];
  for (const service of apiServices) {
    if (
      !existedPhoneNumbers.includes(service.phone_number) &&
      !existedNames.includes(service.name) &&
      !existedAddresses.includes(service.address)
    ) {
      servicesNoDups.push(service);
    }
  }
  return servicesNoDups;
}

/**
 * Gets all of the values of a key in an array of objects
 * @param {Array} services - The services to get the key of
 * @param {string} key - The key to get
 * @returns An array of the values of that key
 */
function getAllOfKey(services, key) {
  let allKey = services.map((service) => service[key]);
  return allKey.filter((item) => item);
}

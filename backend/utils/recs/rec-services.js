// Node Module Imports
import { PrismaClient } from "#prisma/client.js";
const prisma = new PrismaClient();

// Local Imports
import servicesNearby from "#recs/services-nearby.js";
import { reformatServices } from "#recs/rec-utils.js";
import rankServicesByKeyword from "#recs/rank-by-keyword.js";
import findExistingServicesWithinRadius from "#recs/rec-existing.js";
import { normalizeServiceFromRank } from "#utils/ranking-utils.js";
import { errorReturn, successReturn } from "#utils/validate-utils.js";

/**
 * Takes a nonprofit and finds additional services nearby
 * + Uses the google places API to find nearby nonprofits and reformats the data and returns it
 * @param {object} nonprofit - The nonprofit to find additional services for
 * @returns {Array} - The reformatted services nearby
 */
export default async function recServices(nonprofit) {
  // Get other services within this nonprofit's Perimeter
  let servicesFromDB = await findExistingServicesWithinRadius(nonprofit);

  // If there are less than 60 services, find nearby services using google places API
  if (servicesFromDB.length < 60) {
    // Find nearby services
    const result = await servicesNearby(nonprofit);
    if (!result.valid) {
      return errorReturn(result.error);
    }
    const apiServices = result.data;
    // Reformat the services
    const reformattedApiServices = reformatServices(apiServices);
    // Remove Duplicates Services Already in Database
    const apiServicesNoDups = await removeServiceDuplicates(
      reformattedApiServices,
      nonprofit
    );
    // Rank the services by keyword
    const serviceApiKeywordRanked = await rankServicesByKeyword(
      apiServicesNoDups
    );

    // Put the services in the database at a higher ranking for now
    // TODO put in a real ranking system
    let highRanking = serviceApiKeywordRanked[0].ranking + 2;
    servicesFromDB.forEach((service) => (service.ranking = highRanking));
    servicesFromDB = servicesFromDB.concat(serviceApiKeywordRanked);
  } else {
    // As the services are from another nonprofit, they can all be ranked 1
    servicesFromDB.forEach((service) => (service.ranking = 1));
  }
  const normalizedServices = normalizeServiceFromRank(servicesFromDB);
  return successReturn(normalizedServices);
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

  // Get all of the values of the keys in existing services
  const existedPhoneNumbers = getAllOfKey(existedServices, "phone_number");
  const existedNames = getAllOfKey(existedServices, "name");
  const existedAddresses = getAllOfKey(existedServices, "address");

  // Loop through added services and make sure they do not match any of the existing services
  let apiServicesNoDups = [];
  for (const service of apiServices) {
    if (
      !existedPhoneNumbers.includes(service.phone_number) &&
      !existedNames.includes(service.name) &&
      !existedAddresses.includes(service.address)
    ) {
      apiServicesNoDups.push(service);
    }
  }
  return apiServicesNoDups;
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

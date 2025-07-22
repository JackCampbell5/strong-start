// Node Module Imports
import { PrismaClient } from "#prisma/client.js";
const prisma = new PrismaClient();

// Local Imports
import servicesNearby from "#recs/services-nearby.js";
import { reformatServices } from "#recs/rec-utils.js";
import rankServicesByKeyword from "#recs/rank-by-keyword.js";
import getOtherServicesWithinRadius from "#recs/rec-existing.js";
import { normalizeServiceFromRank } from "#utils/ranking-utils.js";
import { errorReturn, successReturn } from "#utils/validate-utils.js";

/**
 * Takes a nonprofit and finds additional services nearby
 * + Uses the google places API to find nearby nonprofits and reformats the data and returns it
 * @param {object} nonprofit - The nonprofit to find additional services for
 * @returns {Array} - The reformatted services nearby
 */
export default async function recServices(nonprofit) {
  // Get other services within this nonprofit's radius
  let otherServices = await getOtherServicesWithinRadius(nonprofit);

  // If there are less than 60 services, find nearby services using google places API
  if (otherServices.length < 60) {
    const apiServices = await servicesNearby(nonprofit);
    // Reformat the services
    const reformattedServices = reformatServices(apiServices);
    // Remove Duplicates Services Already in Database
    const servicesNoDups = await removeServiceDuplicates(
      reformattedServices,
      nonprofit
    );
    // Rank the services by keyword
    const serviceKeywordRanked = await rankServicesByKeyword(servicesNoDups);

    // Put the services in the database at a higher ranking for now
    // TODO put in a real ranking system
    let highRanking = serviceKeywordRanked[0].ranking + 2;
    otherServices.forEach((service) => (service.ranking = highRanking));
    otherServices = otherServices.concat(serviceKeywordRanked);
  } else {
    // As the services are from another nonprofit, they can all be ranked 1
    otherServices.forEach((service) => (service.ranking = 1));
  }
  const normalizedServices = normalizeServiceFromRank(otherServices);
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

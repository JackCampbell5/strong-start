// Node Module Imports
import { PrismaClient } from "#prisma/client.js";
const prisma = new PrismaClient();

// Local Imports
import { errorReturn, successReturn } from "#utils/validate-utils.js";
import servicesNearby from "#recs/services-nearby.js";
import { reformatServices } from "#recs/rec-utils.js";

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

  // Reformat the services
  const reformattedServices = reformatServices(result.data.places);

  return successReturn(reformattedServices);
}

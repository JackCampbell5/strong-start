// Node Module Imports
import { PrismaClient } from "#prisma/client.js";

// Local Imports
import { perimeterOverlap, serviceInPerimeter } from "#search/dist-utils.js";
import { getCords, getAreaAroundPoint } from "#search/dist-utils.js";
import { nonprofitRadius } from "#utils/constants.js";

const prisma = new PrismaClient();

/**
 * Find what other nonprofits are within the nonprofit's perimeter
 * @param {object} nonprofit - The nonprofit to find the duplicate services in
 */
export default async function findExistingServicesWithinRadius(nonprofit) {
  // Location info for this nonprofit
  const loc = getCords(nonprofit.addressInfo);
  let range = getAreaAroundPoint(loc.latitude, loc.longitude, nonprofitRadius);

  // Get all of the nonprofits whos perimeter overlaps with the nonprofit's perimeter
  const nonprofitsInRange = await getNonProfitsOverlappingPerimeter(
    nonprofit,
    range
  );

  // Get all of the services within those nonprofits who are also in our nonprofit's perimeter
  const servicesInRange = await getServicesInRange(range, nonprofitsInRange);
  return servicesInRange;
}

/**
 * Gets the nonprofits that overlap with the given nonprofit's perimeter
 * @param {object} nonprofit - The current nonprofit
 * @param {object} range - The range of the current nonprofit in the form {low: {latitude, longitude}, high: {latitude, longitude}}
 * @returns The list of nonprofits that overlap with the current nonprofit's perimeter
 */
async function getNonProfitsOverlappingPerimeter(nonprofit, range) {
  // Get all of the nonprofits who are not the current nonprofit
  let otherNonprofits = await prisma.nonprofit.findMany({
    where: {
      id: { not: nonprofit.id },
    },
  });

  // Filter out the nonprofits that are not in the current nonprofit's range
  const nonprofitsInRange = otherNonprofits.filter((otherNonprofit) => {
    const checkLoc = getCords(otherNonprofit.addressInfo);
    let checkRange = getAreaAroundPoint(
      checkLoc.latitude,
      checkLoc.longitude,
      nonprofitRadius
    );
    return perimeterOverlap(range, checkRange);
  });
  return nonprofitsInRange;
}

/**
 * Gets the services that are in the range of the current nonprofit but only checks the ones where nonprofits have overlapping perimeter
 * @param {object} range - The range of the current nonprofit in the form {low: {latitude, longitude}, high: {latitude, longitude}}
 * @param {Array} nonprofitsInRange - List of nonprofits that have overlapping perimeter with the current nonprofit
 * @returns The list of services that are in the range of the current nonprofit
 */
async function getServicesInRange(range, nonprofitsInRange) {
  // Get all of the services within the nonprofit's perimeter
  let otherServices = await prisma.service.findMany({
    where: {
      nonprofit_ID: { in: nonprofitsInRange.map((nonprofit) => nonprofit.id) },
    },
  });
  let servicesInRange = otherServices.filter((service) => {
    if (!service.addressInfo) return false;
    const checkLoc = getCords(service.addressInfo);
    return serviceInPerimeter(range, checkLoc);
  });
  return servicesInRange;
}

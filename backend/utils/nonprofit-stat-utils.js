// Node Module Imports
import { PrismaClient } from "#prisma/client.js";

const prisma = new PrismaClient();

/**
 * Generates the stats for a nonprofit
 * Stored in the form objectName: {name: "objectName", key: objectValue}
 * TODO: Store this somewhere so I do not have to calculate it every time as that may use a lot of compute
 * @param {object} nonprofit The nonprofit object to generate stats for
 * @returns The object containing the stats
 */
export async function generateStats(nonprofit) {
  // Gets all the services for a nonprofit
  const allServices = await prisma.service.findMany({
    where: { nonprofit_ID: nonprofit.id },
  });

  const servicesNumber = allServices.length;
  const popularZipCode = getPopularZipCode(allServices);

  // Gets a list of all the services offered by the nonprofit
  const servicesOffered = allServices.reduce((acc, service) => {
    return [...acc, ...service.services_offered];
  }, []);
  const serviceCount = getServiceCount(servicesOffered);
  const servicePopular = getServicePopular(servicesOffered);

  // What is being returned to the user
  const result = {
    servicesNumber: { name: "Service #:", key: servicesNumber },
    servicesOffered: { name: "Service Types #:", key: serviceCount },
    popularZipCode: { name: "Popular Zip Codes:", key: popularZipCode },
    servicePopular: { name: "Popular Service Types:", key: servicePopular },
  };
  return result;
}

/**
 * Gets the popular zipcode for a nonprofits services
 * @param {object} allServices - All the services for a nonprofit
 * @returns Up to the top 2 popular zipcodes
 */
function getPopularZipCode(allServices) {
  // Get just the zipcodes from the services
  const serviceZipCodes = allServices.reduce((acc, service) => {
    return [...acc, service.zipcode];
  }, []);
  return getPopular(serviceZipCodes);
}

/**
 * Get the most popular items from a list and returns the top 2
 * @param {object} list The list of items to get the popular items from. Duplicate items are allowed
 * @returns The top 2 most popular items in a string form separated by a comma
 */
export function getPopular(list) {
  if (Array.isArray(list) == false) {
    throw new Error("List must be an array");
  }
  // Count the number of times each value appears
  let result = {};
  for (let a in list) {
    const key = list[a];
    if (key == null) continue;
    if (result[key]) {
      result[key] += 1;
    } else {
      result[key] = 1;
    }
  }
  // Sort the values by number of times they appear and return the top 3
  const popularTypes = Object.entries(result)
    .sort(([key1, a], [key2, b]) => a - b)
    .reverse();
  const popularList = popularTypes.map((type) => type[0]);
  // Format the result and return
  const popular = popularList.slice(0, 2).join(", ");
  return popular;
}

/**
 * Gets the number of services offered by a nonprofit
 * @param {object} servicesOffered - An object containing all the services offered by a nonprofit
 * @returns The number of services offered by a nonprofit
 */
function getServiceCount(servicesOffered) {
  const serviceCount = [...new Set(servicesOffered)].length;
  return serviceCount;
}

/**
 * Gets the most popular 2 services offered by a nonprofit
 * @param {object} servicesOffered - An object containing all the services offered by a nonprofit
 * @returns The most popular 2 services offered by a nonprofit
 */
function getServicePopular(servicesOffered) {
  return getPopular(servicesOffered);
}

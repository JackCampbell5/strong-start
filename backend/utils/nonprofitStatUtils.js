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
  let allServices = await prisma.service.findMany({
    where: { nonprofit_ID: nonprofit.id },
  });

  let servicesNumber = allServices.length;
  let popularZipCode = getPopularZipCode(allServices);

  // Gets a list of all the services offered by the nonprofit
  let servicesOffered = allServices.reduce((acc, service) => {
    return [...acc, ...service.services_offered];
  }, []);
  let serviceCount = getServiceCount(servicesOffered);
  let servicePopular = getServicePopular(servicesOffered);

  // What is being returned to the user
  let result = {
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
  let serviceZipCodes = allServices.reduce((acc, service) => {
    return [...acc, service.zipcode];
  }, []);
  return getPopular(serviceZipCodes);
}

/**
 * Get the most popular items from a list and returns the top 2
 * @param {*} list The list of items to get the popular items from
 * @returns The top 2 most popular items in a string form separated by a comma
 */
function getPopular(list) {
  // Count the number of times each zipcode appears
  console.log(list);
  let result = {};
  for (let a in list) {
    let key = list[a];
    if (key == null) continue;
    if (result[key]) {
      result[key] += 1;
    } else {
      result[key] = 1;
    }
  }
  // Sort the zipcodes by number of times they appear and return the top 3
  let popularList = Object.keys(result)
    .sort((a, b) => a - b)
    .reverse();

  // Format the result and return
  let popular = "";
  for (let a = 0; a < popularList.length && a < 2; a++) {
    popular += popularList[a] + ", ";
  }
  popular = popular.slice(0, -2);
  return popular;
}

/**
 * Gets the number of services offered by a nonprofit
 * @param {object} servicesOffered - An object containing all the services offered by a nonprofit
 * @returns The number of services offered by a nonprofit
 */
function getServiceCount(servicesOffered) {
  let serviceCount = [...new Set(servicesOffered)].length;
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

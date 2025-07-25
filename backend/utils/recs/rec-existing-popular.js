// Node Module Imports
import { prisma } from "#utils/constants.js";

/**
 * Finds the most popular info for a nonprofits fields of id, zipcode, services_offered, and languages
 * @param {object} nonprofit - The object to get the popular info for
 * @returns The popular info for the nonprofit
 */
export async function getCurrentlyPopularInfo(nonprofit) {
  let popular = {};

  // Get more popular info from the search logs
  let searchLog = await prisma.web_log.findMany({
    where: {
      NOT: { search_log: null }, // Filter out logs that don't have a search log
      nonprofit_ID: nonprofit.id,
      action: "search",
    },
    include: {
      search_log: true,
    },
  });

  popular["zipcode"] = await getPopularOfType(searchLog, "zipcode");
  popular["services_offered"] = await getPopularOfType(
    searchLog,
    "services_needed"
  );
  let languages = await getPopularOfType(searchLog, "languages");
  if (languages["english"]) delete languages["english"];
  popular["languages"] = languages;
  return popular;
}

/**
 * Takes a list of logs and a type and returns a dictionary of the popular types and their counts
 * @param {Array} logs - The logs to extract the type from
 * @param {string} type - The type to extract from the logs
 * @returns a dictionary of the popular types and their counts
 */
async function getPopularOfType(logs, type) {
  let typeList = logs.flatMap((log) => {
    log.search_log ? log.search_log[type] : [];
  });
  return getPopularFromList(typeList);
}

/**
 * Takes a list of strings and returns a dictionary of the popular strings and their counts
 * @param {Array} list - Array with duplicates to count
 * @returns The popular strings and their counts
 */
function getPopularFromList(list) {
  let popular = {};
  list.forEach((service) => {
    if (service in popular) {
      popular[service] += 1;
    } else {
      popular[service] = 1;
    }
  });
  return popular;
}

/**
 * Takes an existing service and returns the number of times it was clicked on in the more details page in the nonprofit it belongs to
 * @param {object} service - The service to get the popular info for
 * @returns The number of times the service was clicked on in the more details page in the nonprofit it belongs to
 */
export async function getPopularOfExistingService(service) {
  let searchLog = await prisma.web_log.findMany({
    where: {
      service_ID: service.id,
      nonprofit_ID: service.nonprofit_ID,
      action: "moreDetails",
    },
  });
  return searchLog.length;
}

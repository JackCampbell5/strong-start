import {
  getCurrentlyPopularInfo,
  getPopularOfExistingService,
} from "#recs/rec-existing-popular.js";
import { REC_FEATURES } from "#recs/rec-constants.js";
import { calculateWeights, weighServices } from "#recs/rec-weight.js";

/**
 * Ranks the services based on the ranking parameters
 * Params: service_number, pop_zipcode, POP_SERVICE_TYPES, pop_languages, completeness, existing, popular, rating, keywords
 * @param {Array} servicesGiven - The services we are trying to rank
 * @param {object} nonprofit - The nonprofit object we are getting recommendations for
 * @returns The ranked services
 */
export default async function rankRecommendedServices(
  servicesGiven,
  nonprofit
) {
  // Get the currently popular info from our database logs
  const popularCurrently = await getCurrentlyPopularInfo(nonprofit);

  const rankingInfo = await extractRankingParams(
    servicesGiven,
    popularCurrently
  );
  // TODO Remove and add actual ranking logic here
  // Temporary so there are weights for PR
  servicesGiven.forEach((element) => {
    element.ranking = Object.values(rankingInfo[element.id]).reduce(
      (a, b) => a + b,
      0
    );
  });
  const calcResults = calculateWeights(rankingInfo);
  const weightedServices = weighServices(
    servicesGiven,
    rankingInfo,
    calcResults
  );
  return weightedServices;
}

/**
 * Extract the ranking parameters for each service to get ready for the ranking
 * @param {Array} servicesGiven - The array of services we would like to rank
 * @param {object} popularCurrently -  Object with what is currently popular in our current nonprofit
 * @returns A object with id's for keys and the ranking parameters as the values for each service
 */
async function extractRankingParams(servicesGiven, popularCurrently) {
  const rankingInfo = {};
  for (const service of servicesGiven) {
    let serviceInfo = {};
    const preExisting = service.nonprofit_ID;
    if (preExisting) {
      // How popular is service
      serviceInfo[REC_FEATURES.EXISTING_POPULARITY] =
        await getPopularOfExistingService(service);
    } else {
      // Add the average google maps rating if it exists
      if (service.rating) {
        serviceInfo[REC_FEATURES.RATING] = service.rating;
      }
      // Get the keyword number out of the current ranking param
      // We are only ranking keywords for API services
      if (service.ranking) {
        serviceInfo[REC_FEATURES.KEYWORDS] = service.ranking;
      }
    }

    // Service number
    serviceInfo[REC_FEATURES.SERVICE_NUMBER] = service.services_offered.length;

    // Popular Zipcodes
    serviceInfo[REC_FEATURES.POP_ZIPCODE] = countPopularElements(
      [service.zipcode],
      popularCurrently["zipcode"]
    );

    // Popular Services
    serviceInfo[REC_FEATURES.POP_SERVICE_TYPES] = countPopularElements(
      service.services_offered,
      popularCurrently["services_offered"]
    );

    // Popular Languages
    serviceInfo[REC_FEATURES.POP_LANGUAGES] = countPopularElements(
      service.language,
      popularCurrently["languages"]
    );

    // The completeness of data
    serviceInfo[REC_FEATURES.COMPLETENESS] = Object.values(service).filter(
      (val) => val !== null
    ).length;

    // In another profits database
    serviceInfo[REC_FEATURES.EXISTING] = service.nonprofit_ID ? 1 : 0;

    // Add to the rankingInfo object
    rankingInfo[service.id] = serviceInfo;
  }
  return rankingInfo;
}
/**
 * Find the total of the values in the array that are in the popularCurrently object
 * @param {Array} arrToCheck - The array of values to find in popularCurrently and sum
 * @param {object} popularCurrently - What is currently popular for that type
 * @returns
 */
function countPopularElements(arrToCheck, popularCurrently) {
  let total = 0;
  for (const val of arrToCheck) {
    if (popularCurrently[val]) {
      total += popularCurrently[val];
    }
  }
  return total;
}

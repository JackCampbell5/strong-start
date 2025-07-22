import {
  getCurrentlyPopularInfo,
  getPopularOfExistingService,
} from "#recs/rec-existing-popular.js";
export default async function rankRecommendedServices(
  servicesGiven,
  nonprofit
) {
  // Get the currently popular info from our database logs
  const popularCurrently = await getCurrentlyPopularInfo(nonprofit);

  const rankingInfo = computeRankingData(servicesGiven, popularCurrently);
  // TODO Remove and add actual ranking logic here
  // Temporary so there are weights for PR
  servicesGiven.forEach((element) => {
    element.ranking = Object.values(rankingInfo[element.id]).reduce(
      (a, b) => a + b,
      0
    );
  });
  // TODO: The function names for the rest of the weight calculations
  //   const weights = calculateWeights(rankingInfo);
  //   const weightedServices = weighServices(servicesGiven, weights);
  return servicesGiven;
}

function computeRankingData(servicesGiven, popularCurrently) {
  const rankingInfo = {};
  for (const service of servicesGiven) {
    let serviceInfo = {};
    const preExisting = service.nonprofit_ID;
    if (preExisting) {
      // How popular is service
      serviceInfo["popularity"] = getPopularOfExistingService(service);
    } else {
      // Add the average google maps rating if it exists
      if (service.rating) {
        serviceInfo["rating"] = service.rating;
      }
      // Get the keyword number out of the current ranking param
      // We are only ranking keywords for API services
      if (service.ranking) {
        serviceInfo["keywords"] = service.ranking;
      }
    }

    // Service number
    serviceInfo["service_number"] = service.services_offered.length;

    // Popular Zipcodes
    serviceInfo["pop_zipcode"] = getPopularTotal(
      [service.zipcode],
      popularCurrently["zipcode"]
    );

    // Popular Services
    serviceInfo["pop_service"] = getPopularTotal(
      service.services_offered,
      popularCurrently["services_offered"]
    );

    // Popular Languages
    serviceInfo["pop_languages"] = getPopularTotal(
      service.language,
      popularCurrently["languages"]
    );

    // The completeness of data
    serviceInfo["completeness"] = Object.values(service).filter(
      (val) => val !== null
    ).length;

    // In another profits database
    serviceInfo["existing"] = service.nonprofit_ID ? 1 : 0;

    // Add to the rankingInfo object
    rankingInfo[service.id] = serviceInfo;
  }
  return rankingInfo;
}

function getPopularTotal(arrToCheck, popularCurrently) {
  let total = 0;
  for (const val of arrToCheck) {
    if (popularCurrently[val]) {
      total += popularCurrently[val];
    }
  }
  return total;
}

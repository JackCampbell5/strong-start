import { getCurrentlyPopularInfo } from "#recs/rec-existing-popular.js";
export default async function rankRecommendedServices(
  servicesGiven,
  nonprofit
) {
  // Get the currently popular info from our database logs
  const popularCurrently = await getCurrentlyPopularInfo(nonprofit);

  const rankingInfo = computeRankingData(servicesGiven, popularCurrently);
  console.log(Object.values(rankingInfo).map((service) => service.existing));

  //   const weights = calculateWeights(rankingInfo);
  //   const weightedServices = weighServices(servicesGiven, weights);
  return servicesGiven;
}

function computeRankingData(servicesGiven, popularCurrently) {
  const rankingInfo = {};
  for (const service of servicesGiven) {
    let serviceInfo = {};

    // Get the keyword number out of the current ranking param
    if (service.ranking) {
      serviceInfo["keywords"] = service.ranking;
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

    // The Completeness of data
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

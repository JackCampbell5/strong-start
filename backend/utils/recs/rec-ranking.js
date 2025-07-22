import { getCurrentlyPopularInfo } from "#recs/rec-existing-popular.js";
export default async function rankRecommendedServices(
  servicesGiven,
  nonprofit
) {
  // Get the currently popular info from our database logs
  const popularCurrently = await getCurrentlyPopularInfo(nonprofit);

  const rankingInfo = computeRankingData(servicesGiven, nonprofit);
  return servicesGiven;
}

function computeRankingData(servicesGiven, nonprofit) {
  const rankingInfo = {};
  for (const service of servicesGiven) {
    let serviceInfo = {};

    // Get the keyword number out of the current ranking param
    if (service.ranking) {
      serviceInfo["keywords"] = service.ranking;
    }

    // Service number
    serviceInfo["service_number"] = service.services_offered.length;

    rankingInfo[service.id] = serviceInfo;
  }
}

import { getCurrentlyPopularInfo } from "#recs/rec-existing-popular.js";
export default async function rankRecommendedServices(
  servicesGiven,
  nonprofit
) {
  // Get the currently popular info from our database logs
  const popularCurrently = await getCurrentlyPopularInfo(nonprofit);

  const rankingInfo = computeRankingData(
    servicesGiven,
    popularCurrently,
    nonprofit
  );
  return servicesGiven;
}

function computeRankingData(servicesGiven, popularCurrently, nonprofit) {
  const rankingInfo = {};
  for (const service of servicesGiven) {
    let serviceInfo = {};

    // Get the keyword number out of the current ranking param
    if (service.ranking) {
      serviceInfo["keywords"] = service.ranking;
    }

    // Service number
    serviceInfo["service_number"] = service.services_offered.length;

    // Add Data from popularCurrently
    for (const key in popularCurrently) {
      const popKey = popularCurrently[key];
      const keyVal = service[key];
      if (Object.keys(popKey).includes(keyVal)) {
        serviceInfo[key] = popKey[keyVal];
      } else {
        serviceInfo[key] = 0;
      }
    }

    rankingInfo[service.id] = serviceInfo;
  }
}

import serviceTypeKeywords from "#recs/serviceTypeKeywords.json" with { type: "json" };
import {prettyPrintService} from "#utils/service-utils.js"

export default function rankServicesByKeyword(servicesGiven) {
  let services = []
  for (let service of servicesGiven) {
    services.push(getKeywordCounts(service));
  }
  let keywords = services.map((service) => service.services_offered);
  let keywordCounts = keywords.map((keyword) =>
    Object.values(keyword).reduce((a, b) => a + b, 0)
  );
  let keywordCountSorted = keywordCounts.sort((a, b) => b - a);

  let rankedServices = [];
  for (let service of services) {
    service.score = keywordCountSorted.indexOf(
      Object.values(service.services_offered).reduce((a, b) => a + b, 0)
    )+1;
    service.services_offered = getPopularKeywords(service.services_offered);
    if (service.services_offered) {
        rankedServices.push(service);
    }
  }
  rankedServices.sort((a, b) => a.score - b.score);
  return rankedServices;
}

function getKeywordCounts(serviceGiven) {
  let service = JSON.parse(JSON.stringify(serviceGiven));
  const reviewsString = service.description.toLowerCase();
  let results = {};
  for (const serviceType in serviceTypeKeywords) {
    const keywords = serviceTypeKeywords[serviceType];
    for (const keyword of keywords) {
      if (reviewsString.includes(keyword)) {
        if (results[serviceType] == undefined) {
          results[serviceType] = 1;
        } else {
          results[serviceType] += 1;
        }
      } // end if keyword is in reviews
    } // end for each keyword
  } // end for each serviceType
  service.services_offered = results;
  return service;
}

function getPopularKeywords(keywords) {
    console.log(keywords);
  let resultString = "";
  for (const keyword in keywords) {
    console.log(keywords[keyword]);
    if (keywords[keyword] > 3) {
      resultString += prettyPrintService(keyword) + ", ";
    }
  }
  resultString = resultString.slice(0, -2);
  return resultString;
}

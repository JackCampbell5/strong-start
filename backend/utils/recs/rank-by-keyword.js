// Local Imports
import serviceTypeKeywords from "#recs/serviceTypeKeywords.json" with { type: "json" };
import { prettyPrintService } from "#utils/service-utils.js";

/**
 * Rank services based how many serviceTypes they offer based on keyword matches
 * + The keyword matches are weighted by how many times they appear in the description(Currently a sum of all user ratings of a place on google maps)
 * @param {Array} servicesGiven -  Array of services to rank based on keyword matches
 * @returns The services sorted by ranking with an updated services offered field
 */
export default function addServicesOfferedInfoByKeyword(servicesGiven) {
  // Update the Services offered field with the keyword counts
  let services = [];
  for (let service of servicesGiven) {
    services.push(getKeywordCounts(service));
  }

  // Add the ranking information to the services, if they offer any services.
  let rankedServices = addServiceInformation(services);
  rankedServices.sort((a, b) => b.ranking - a.ranking);
  return rankedServices;
}

/**
 * Add the ranking information to the services, if they offer any services.
 * + If they dont offer any services, they are not added to the ranked list
 * @param {Array} services - The list of services to add the ranking information to
 * @returns The services with the ranking information added
 */
function addServiceInformation(services) {
  let rankedServices = [];
  for (let service of services) {
    service.ranking = service.services_offered.total;
    // Add the keyword count to the ranked list
    service.services_offered = getPopularKeywords(service.services_offered);
    // If they offer any services, add them to the ranked list
    if (service.services_offered) {
      rankedServices.push(service);
    }
  }
  return rankedServices;
}

/**
 * Gets the count of each keyword category in the description of the service
 * + If there is a description, check for keywords and add counts if not set the services_offered to total:0
 * @param {object} serviceGiven - The Service to count the keywords of
 * @returns The service with the keyword categories added to the services_offered field
 */
function getKeywordCounts(serviceGiven) {
  let service = JSON.parse(JSON.stringify(serviceGiven));
  let keywordCounts = { total: 0 };

  // If it has a description, check for keywords
  if (serviceGiven.description) {
    // Copy the service so we dont modify the original
    const reviewsString = service.description.toLowerCase();

    // Loop thru each service type from the keywords file
    for (const serviceType in serviceTypeKeywords) {
      const keywords = serviceTypeKeywords[serviceType];
      // Loop thru each keyword in the service type and check how many times it appears in the description
      keywordCounts[serviceType] = keywords.filter((keyword) =>
        reviewsString.includes(keyword)
      ).length;
    } // end for each serviceType

    // Add the total number of keywords to the keywordCounts
    keywordCounts.total = Object.values(keywordCounts).reduce(
      (a, b) => a + b,
      0
    );
  } // end if description exists

  // Update the services offered field with the results
  service.services_offered = keywordCounts;
  return service;
}

/**
 * Get any keyword categories that occurred more than 3 times in the description and add them to the result string
 * @param {object} keywords -  The keywords object to check
 * @returns A array with the popular keywords
 */
function getPopularKeywords(keywords) {
  let popularKeywords = [];
  for (const keyword in keywords) {
    if (keywords[keyword] > 3 && keyword !== "total") {
      popularKeywords.push(keyword);
    }
  }
  return popularKeywords;
}

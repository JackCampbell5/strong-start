// Local Imports
import serviceTypeKeywords from "#recs/serviceTypeKeywords.json" with { type: "json" };
import { prettyPrintService } from "#utils/service-utils.js";

/**
 * Rank services based how many services they offer based on keyword matches
 * + The keyword matches are weighted by how many times they appear in the description(Currently a sum of all user ratings of a place on google maps)
 * @param {Array} servicesGiven -  Array of services to rank based on keyword matches
 * @returns The services sorted by ranking with an updated services offered field
 */
export default function rankServicesByKeyword(servicesGiven) {
  // Update the Services offered field with the keyword counts
  let services = [];
  for (let service of servicesGiven) {
    services.push(getKeywordCounts(service));
  }
  // Sort the keyword counts by total
  let keywordCount = services
    .map((keyword) => keyword.total)
    .sort((a, b) => b - a);

  // Add the ranking information to the services, if they offer any services.
  let rankedServices = addRankingInformation(services, keywordCount);
  rankedServices.sort((a, b) => a.score - b.score);
  return rankedServices;
}

/**
 * Add the ranking information to the services, if they offer any services.
 * + If they dont offer any services, they are not added to the ranked list
 * @param {Array} services - The services to add the ranking information to
 * @param {Array} keywordCount - The sorted keyword counts to use for the ranking information
 * @returns The services with the ranking information added
 */
function addRankingInformation(services, keywordCount) {
  let rankedServices = [];
  for (let service of services) {
    // Add the keyword count to the ranked list
    service.services_offered = getPopularKeywords(service.services_offered);
    // If they offer any services, add them to the ranked list
    if (service.services_offered) {
      service.ranking = keywordCount.indexOf(service.total) + 1;
      rankedServices.push(service);
    }
  }
  return rankedServices;
}

/**
 * Gets the count of each keyword category in the description of the service
 * + If there is a description, check for keywords and add counts if not set the services_offered to total:0
 * @param {object} serviceGiven - The Service to count the keywords of
 * @returns
 */
function getKeywordCounts(serviceGiven) {
  let service = JSON.parse(JSON.stringify(serviceGiven));
  let results = { total: 0 };

  // If it has a description, check for keywords
  if (serviceGiven.description) {
    // Copy the service so we dont modify the original
    const reviewsString = service.description.toLowerCase();

    // Loop thru each service type from the keywords file
    for (const serviceType in serviceTypeKeywords) {
      const keywords = serviceTypeKeywords[serviceType];

      // Loop thru each keyword and check against the description
      for (const keyword of keywords) {
        // Update the counts in the results object if included
        if (reviewsString.includes(keyword)) {
          if (results[serviceType] == undefined) {
            results[serviceType] = 1;
          } else {
            results[serviceType] += 1;
          }
          results.total++;
        } // end if keyword is in reviews
      } // end for each keyword
    } // end for each serviceType
  } // end if description exists

  // Update the services offered field with the results
  service.services_offered = results;
  return service;
}

/**
 * Get any keyword categories that occurred more than 3 times in the description and add them to the result string
 * @param {*} keywords -  The keywords object to check
 * @returns A string with the popular keywords
 */
function getPopularKeywords(keywords) {
  let resultString = "";
  for (const keyword in keywords) {
    if (keywords[keyword] > 3 && keyword !== "total") {
      resultString += prettyPrintService(keyword) + ", ";
    }
  }
  resultString = resultString.slice(0, -2);
  return resultString;
}

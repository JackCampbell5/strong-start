// Node Module Imports
import { PrismaClient } from "#prisma/client.js";
const prisma = new PrismaClient();

// Local Imports
import formatAddress from "#utils/search/address-utils.js";
import { calcDistance, getCords } from "#search/dist-utils.js";
import { errorReturn, successReturn } from "#utils/validate-utils.js";
import { routeBetween, createDirectionLink } from "#search/direction-utils.js";

/**
 * The weights for each parameter as of now(Total = 100)
 */
const weights = {
  address: 30,
  services: 50,
  language: 10,
  date: 10,
};

/**
 * Gets the top 5 services based on the query parameters given
 * @param {object} query - The query parameters given in the search
 * @param {object} nonprofit - Object containing the nonprofit information
 * @returns
 */
export default async function searchServices(query, nonprofit) {
  // Validate the query params
  const params = await isValidParams(query, nonprofit);
  if (!params.valid) {
    return errorReturn(params.error);
  }

  // Weight and return the top 5 services
  const topData = await topServices(params.data, nonprofit);
  if (!topData.valid) {
    return errorReturn(topData.error);
  }
  return successReturn(topData.data);
}

/**
 * Takes the services, ranks them, and returns the top 5 services
 * @param {object} params - The valid query parameters given in the search
 * @param {object} nonprofit - The nonprofit object containing the nonprofits id and other information
 * @returns max 5 services with the highest ranking or an error
 */
async function topServices(params, nonprofit) {
  // Get the services for a given nonprofit
  const foundServices = await prisma.service.findMany({
    where: {
      nonprofit_ID: nonprofit.id,
    },
  });

  const serviceWithWeight = weightServices(foundServices, params);

  // Sort the services by ranking
  const rankedOrder = serviceWithWeight.sort((a, b) => {
    return b.ranking - a.ranking;
  });

  // Return the top 5 services by ranking
  // TODO: do this via normal distribution for more accurate results and remove outliers
  const top = rankedOrder.slice(0, 5);

  const result = await addRouteData(top, params.address);
  if (!result.valid) {
    return errorReturn(result.error);
  }

  return successReturn(result.data);
}

/**
 * Takes all of the services and adds the route length and link to that route
 * @param {Array} services - Array of services to add route data to
 * @param {*} address - The address of the user
 * @returns The services with the route data added or an error
 */
async function addRouteData(services, address) {
  for (let service of services) {
    let result = await routeBetween(address, service.addressInfo);
    if (result.valid) {
      service.routeLength = result.data;
      service.routeLink = createDirectionLink(address, service.addressInfo);
    } else {
      return errorReturn(result.error);
    }
  }
  return successReturn(services);
}

/**
 * Search thru the different services and calculate the weights for each one based on global weights
 * @param {object} foundServices - The services found in the database to search within
 * @param {object} params - Object containing the parameters for the search
 * @returns The list of services with their ranking
 */
function weightServices(foundServices, params) {
  // Get the params
  const address = params.address;
  const services = params.services;
  const language = params.language;
  const date_entered = params.date_entered;

  // Calculate the weights for each service
  let weightTotals = [];
  const refugeeCords = getCords(address);
  for (const service of foundServices) {
    let ranking = 0;

    if (service.addressInfo) {
      // Add the address weight
      const cords = getCords(service.addressInfo);
      const distance = calcDistance(cords, refugeeCords);
      if (distance < 20) {
        ranking += ((20 - distance) / 20) * weights.address;
      }
    }

    // Add the services weight
    for (const service_needed of service.services_offered) {
      if (services.includes(service_needed)) {
        ranking += weights.services;
      }
    }

    // Add the language weight
    let languageList = service.language;
    if (
      !language ||
      language === "english" ||
      languageList.includes(language) ||
      service.language === null
    ) {
      ranking += weights.language;
    }

    // Add the date weight
    if (
      !date_entered ||
      date_entered > new Date(service.date_created) ||
      service.date_needed === null
    ) {
      ranking += weights.date;
    }

    weightTotals.push({ ...service, ranking: ranking });
  }
  return weightTotals;
}

/**
 * Validates the query parameters given if they exist. Returning errors if there are validation errors
 * @param {object} query - The query parameters given in the search
 * @param {object} nonprofit - The nonprofit object containing the nonprofits id and other information
 * @returns The valid query parameters or an error
 */
async function isValidParams(query, nonprofit) {
  // Params that can be used for search
  const address_given = query.address;
  const services_needed_given = JSON.parse(query.services_needed);
  const language_given = query.language;
  const date_entered_given = query.date_entered;

  let params = {};

  // Validate Address and return errors if they exist
  const result = await formatAddress(address_given, nonprofit);
  if (!result.valid) {
    return errorReturn(result.error);
  }
  params.address = result.data;

  // Extract Services Needed
  params.services = services_needed_given.map((service) => {
    return service.value;
  });

  // Validate Language
  if (params.language) {
    params.language = language_given.trim().toLowerCase();
  }

  // Validate Date
  params.date_entered = "";
  if (date_entered_given) {
    const date_valid = getAndValidateDate(date_entered_given);
    if (!date_valid.valid) {
      return errorReturn(date_valid.error);
    }
    date_entered = date_valid.data;
  }

  return successReturn(params);
}

/**
 * Validates that the date is in the correct format of MM-DD-YYYY
 * @param {string} date- The date to validate
 * @returns A date object or an error
 */
export function getAndValidateDate(date) {
  const date_regex =
    /^(?:((?:0?[1-9])|10|11|12)-(0?[1-9]|[12]\d|30|31)-(\d{4}))$/;
  if (!date_regex.test(date)) {
    return errorReturn(
      "Invalid date format. Please use MM-DD-YYYY or leave blank."
    );
  } else {
    const dateParts = date.match(date_regex);
    return successReturn(
      new Date(dateParts[3], dateParts[1] - 1, dateParts[2])
    );
  }
}

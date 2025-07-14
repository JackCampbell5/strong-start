// Node Module Imports
import { PrismaClient } from "#prisma/client.js";
const prisma = new PrismaClient();

// Local Imports
import formatAddress from "#utils/search/address-utils.js";
import { calcDistance, getCords } from "#search/dist-utils.js";
import { errorReturn, successReturn } from "#utils/validate-utils.js";
import { reformatTitle } from "#utils/filter-create-utils.js";

const weights = {
  address: 30,
  services: 50,
  language: 10,
  date: 10,
};

export default async function searchServices(query, nonprofit) {
  const params = await validParams(query, nonprofit);
  if (!params.valid) {
    return errorReturn(params.error);
  }
  let paramData = params.data;
  let address = paramData.address;
  let services = paramData.services;
  let language = paramData.language;
  let date_entered = paramData.date_entered;

  const foundServices = await prisma.service.findMany({
    where: {
      nonprofit_ID: nonprofit.id,
    },
  });

  let rankingTotals = {};
  let nonprofitCords = getCords(nonprofit.addressInfo);
  for (const service of foundServices) {
    let ranking = 0;

    // Check address
    let cords = getCords(service.addressInfo);
    let distance = calcDistance(cords, nonprofitCords);

    // Check service offered
    for (const service_needed of service.services_offered) {
      let encoded = reformatTitle(service_needed);
      if (services.includes(encoded)) {
        ranking += weights.services;
      }
    }

    // Language Weight adding
    if (
      language &&
      (language === service.language.lowercase() || service.language === null)
    ) {
      ranking += weights.language;
    }

    // Date Entered weight adding
    if (
      date_entered &&
      (date_entered > new Date(service.date_created) ||
        service.date_needed === null)
    ) {
      ranking += weights.date;
    }

    rankingTotals[service.id] = ranking;
  }
  return successReturn(foundServices);
}

async function validParams(query, nonprofit) {
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
    service.id;
  });

  // Validate Language
  if (params.language) {
    params.language = language_given.lowercase();
  }

  // Validate Date
  params.date_entered = "";
  if (date_entered_given) {
    let date_valid = getAndValidateDate(date_entered_given);
    if (!date_valid.valid) {
      return errorReturn(date_valid.error);
    }
    date_entered = date_valid.data;
  }

  return successReturn(params);
}

function getAndValidateDate(date) {
  let date_regex =
    /^(?:((?:0?[1-9])|10|11|12)-(0?[1-9]|[12]\d|30|31)-(\d{4}))$/;
  if (!date_regex.test(date)) {
    return errorReturn("Invalid date format. Please use MM-DD-YYYY.");
  } else {
    let dateParts = date.match(date_regex);
    return successReturn(
      new Date(dateParts[3], dateParts[1] - 1, dateParts[2])
    );
  }
}

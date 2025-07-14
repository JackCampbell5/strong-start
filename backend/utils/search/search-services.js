// Node Module Imports
import { PrismaClient } from "#prisma/client.js";
const prisma = new PrismaClient();

// Local Imports
import formatAddress from "#utils/search/address-utils.js";
import { errorReturn, successReturn } from "#utils/validate-utils.js";

export default async function searchServices(query, nonprofit) {
  const params = await validParams(query);
  if (!params.valid) {
    return errorReturn(params.error);
  }

  const foundServices = await prisma.service.findMany({
    where: {
      nonprofit_ID: nonprofit.id,
    },
  });
  return successReturn(foundServices);
}

async function validParams(query) {
  // Params that can be used for search
  const address_given = query.address;
  const services_needed_given = query.services_needed;
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
  params.language = language_given.lowercase();

  // Validate Date
  params.date_entered = "";
  if (date_entered_given !== "") {
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

// Node Module Imports
import { PrismaClient } from "#prisma/client.js";
const prisma = new PrismaClient();

// Local Imports
import formatAddress from "#utils/search/address-utils.js";
import {
  errorReturn,
  successReturn,
  validResult,
  getResultData,
  getResultError,
} from "#utils/validate-utils.js";

export default async function searchServices(query, nonprofit) {
  // Params that can be used for search
  const address = query.address;
  const services_needed = query.services_needed;
  const country_of_origin = query.country_of_origin;
  const language = query.language;
  const date_entered = query.date_entered;
  const family_members = query.family_members;

  // Validate Address and print errors if they exist
  const result = await formatAddress(address, nonprofit);
  if (!validResult(result)) {
    return errorReturn(getResultError(result));
  }
  const addressValid = getResultData(result);

  const foundServices = await prisma.service.findMany({
    where: {
      nonprofit_ID: nonprofit.id,
    },
  });
  return successReturn(foundServices);
}

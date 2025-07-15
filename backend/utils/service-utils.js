// Node Module Imports
import { PrismaClient } from "#prisma/client.js";

// Local Imports
import formatAddress from "#utils/search/address-utils.js";
import { getAndValidateDate } from "#search/search-services.js";
import { errorReturn, successReturn } from "./validate-utils.js";

const prisma = new PrismaClient();

/**
 * Checks if a service exists with that name
 * @param {String} name The name to check
 * @returns True if it exists, false otherwise
 */
export async function checkServiceName(name, nonprofit, next) {
  try {
    const resultData = await prisma.service.findMany({
      where: {
        name: name,
        nonprofit_ID: nonprofit.id,
      },
    });
    if (resultData !== null && resultData.length > 1) {
      throw new Error(
        "Multiple services with the same name in one nonprofit found"
      );
    }
    return resultData !== null && resultData.length === 1;
  } catch (e) {
    next(e);
  }
}

/**
 * Checks if a service exists with that id
 * @param {String} id The id to check
 * @returns True if it exists, false otherwise
 */
export async function checkServiceId(id, nonprofit, next) {
  try {
    const resultData = await prisma.service.findUnique({
      where: {
        id: id,
        nonprofit_ID: nonprofit.id,
      },
    });
    return resultData !== null;
  } catch (e) {
    next(e);
  }
}

export async function validateServiceData(serviceData, nonprofit = null) {
  let updatedService = { ...serviceData };
  let errorMessage = "";

  // Format address and add
  let addressInfo = await formatAddress(updatedService.address, nonprofit);

  if (!addressInfo.valid) {
    errorMessage += addressInfo.errorMessage + ", ";
  } else {
    updatedService.addressInfo = addressInfo.data;
    updatedService.address = addressInfo.data.formattedAddress;
  }

  // Format the addresses as an array
  if (updatedService.language) {
    updatedService.language = updatedService.language.split(",").map((lang) => {
      return lang.trim().toLowerCase();
    });
  } else {
    updatedService.language = [];
  }

  // Validate the date
  let date = getAndValidateDate(updatedService.date_needed);
  if (!date.valid) {
    errorMessage += date.error + ", ";
  } else {
    updatedService.date_needed = date.data.toISOString();
  }

  if (errorMessage.length > 0) {
    return errorReturn(errorMessage.slice(0, -2));
  } else {
    return successReturn(updatedService);
  }
}

// Local Imports
import formatAddress from "#utils/search/address-utils.js";
import { getAndValidateDate } from "#search/search-services.js";
import { errorReturn, successReturn } from "../validate-utils.js";

/**
 * Reformats the title to match the format of the select component needs
 * @param {string} title - The title to be reformatted
 * @returns The reformatted title
 */
function standardizedServicesOffered(title) {
  return title.trim().replaceAll(" ", "_").toLowerCase();
}

/**
 * Reformats the entire service list to be returned to the client
 * Ex: food_service -> Food Service
 * @param {string array} serviceList  - The service list to be reformatted
 * @returns The reformatted service list pretty printed
 */
export function prettyPrintServicesOfferedList(serviceList) {
  return serviceList
    .map((service) => {
      return prettyPrintService(service);
    })
    .join(", ");
}

/**
 *  Reformats a single service to be returned to the client
 * @param {string} service - The string to be reformatted pretty
 * @returns The correctly formatted service text
 */
export function prettyPrintService(service) {
  const words = service.split("_");
  const capWords = words.map((word) => {
    if (word.length > 0) {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    } else {
      return word;
    }
  });
  return capWords.join(" ");
}

/**
 * Reformats the service data to be returned to the client
 * + Currently only reformats the services offered and the languages for readability in string form
 * @param {object} orgServices - The service data to be reformatted
 * @returns The formatted data
 */
export function reformatServiceForReturn(orgServices) {
  return orgServices.map((service) => {
    const { rating, ...serviceInfoToReturn } = service;
    return {
      ...serviceInfoToReturn,
      services_offered: prettyPrintServicesOfferedList(
        serviceInfoToReturn.services_offered
      ),
      language: serviceInfoToReturn.language.join(", "),
      date_needed: dateString(serviceInfoToReturn.date_needed),
    };
  });
}

/**
 *  Formats the date to be returned to the client in the form we want
 * @param {string} dateStr - The date string to be formatted
 * @returns The formatted date as a string in the correct format
 */
export function dateString(dateStr) {
  const date = new Date(dateStr);
  const dateFormatted = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  return dateFormatted.replace(/\//g, "-");
}

/**
 * Validate and Formats the service data and returns the formatted data
 * + Checks if the address is valid, the date is valid, and makes the languages and services offered in a standardized format
 * + If the nonprofit is null then it tries to find the address in the whole world
 * @param {object} serviceData - The service data to validate
 * @param {object} nonprofit - The nonprofit that the service belongs to
 * @returns The formatted service data in a error checking object or an error message
 */
export async function validateAndFormatServiceData(
  serviceData,
  nonprofit = null
) {
  let updatedService = { ...serviceData };
  let errorMessage = "";

  // Format address and add
  let addressInfo = await formatAddress(updatedService.address, nonprofit);

  if (!addressInfo.valid) {
    errorMessage += addressInfo.error + ", ";
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
  if (updatedService.date_needed) {
    let date = getAndValidateDate(updatedService.date_needed);
    if (!date.valid) {
      errorMessage += date.error + ", ";
    } else {
      updatedService.date_needed = date.data.toISOString();
    }
  }

  updatedService.services_offered = updatedService.services_offered.map(
    (service) => standardizedServicesOffered(service)
  );

  if (errorMessage.length > 0) {
    return errorReturn(errorMessage.slice(0, -2));
  } else {
    return successReturn(updatedService);
  }
}

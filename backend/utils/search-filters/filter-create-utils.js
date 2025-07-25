// Node Module Imports
import { prisma } from "#utils/constants.js";

// Local Imports
import data from "#search-filters/filter-default-data.json" with { type: "json" };
import { prettyPrintService } from "#api-helpers/service-param-standardize.js"


/**
 * Creates the filters for a given nonprofit based on their services
 * @param {object} nonprofit - Nonprofit object
 * @returns The filters for the nonprofit
 */
export default async function getFilter(nonprofit) {
  // Get all of the services offered by the nonprofit
  const foundServices = await prisma.service.findMany({
    where: {
      nonprofit_ID: nonprofit.id,
    },
  });

  let uniqueFilters = getUniqueFilters(foundServices);


  // Add the filters to the data array
  for (let filter of data) {
    if (filter.id === "services_needed") {
      filter.options = uniqueFilters;
    }
  }

  return data;
}

/**
 * Reformats the filters to match the format of the select component needs
 * @param {object} data - The data to be reformatted
 * @returns The reformatted data
 */
function reformatForSelect(data) {
  // Reformat the filters to match the format of the select component needs
  return data.map((filter) => {
    return { value: filter, label: prettyPrintService(filter) };
  });
}

/**
 * Searches thru the given data and returns the unique filters
 * @returns The unique filters from the nonprofit's services
 */
function getUniqueFilters(services) {
  // Get an array of just the filters
  const foundFilters = services.reduce((acc, service) => {
    service.services_offered.forEach((filter) => acc.push(filter.trim()));
    return acc;
  }, []);

  // Reformat the filters to match the format of the select component needs
  const filterData = reformatForSelect(foundFilters);

  // Sort and remove duplicates from the array
  const orderedFilters = filterData.sort((a, b) => a.value.localeCompare(b.value));
  let uniqueValues =  [...new Set(orderedFilters.map((filter) => filter.value))]
  return uniqueValues.map((value)=> {return {value:value, label:orderedFilters.find((filter)=>{return filter.value===value}).label}});
}

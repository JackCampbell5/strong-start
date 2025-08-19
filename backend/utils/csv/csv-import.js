import { errorReturn, successReturn } from "#utils/validate-utils.js";
import { Readable } from "stream";
import csv from "csv-parser";

import { checkServiceNameBoolean } from "#utils/api-helpers/service-utils.js";
import { validateAndFormatServiceData } from "#utils/api-helpers/service-param-standardize.js";
import { prisma } from "#utils/constants.js";

export async function importCSV(file, nonprofit) {
  let csvObject = await parseCSV(file);
  if (!csvObject.valid) {
    return errorReturn(csvObject.error);
  } else {
    csvObject = csvObject.data;
  }
  const servicesWithErrors = await addAllServicesAndGetErrors(
    csvObject,
    nonprofit
  );
  return successReturn(servicesWithErrors);
}

/**
 * Reads all the data from the csv file and add it to an object
 * @param {object} file - File object with buffer
 * @returns The data from the csv file
 */
async function parseCSV(file) {
  const readableStream = Readable.from(file.buffer.toString()); // Convert buffer to string and create a readable stream
  const results = [];

  try {
    await new Promise((resolve, reject) => {
      readableStream
        .pipe(csv())
        .on("data", (data) => results.push(data)) // Collect parsed data rows
        .on("end", () => {
          resolve();
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  } catch (error) {
    return errorReturn(error.message);
  }
  return successReturn(results);
}

/**
 *
 * @param {object} csvObject - Takes Json Format and makes it readable
 * @returns
 */
async function addAllServicesAndGetErrors(csvObject, nonprofit) {
  let formattedData = [];
  let num = 0;
  for (const row of csvObject) {
    let serviceData = row;
    const name = serviceData.name;
    const exists = await checkServiceNameBoolean(name, nonprofit); //If a service were to exist
    const serviceDataWithHours = addHoursData(serviceData);
    const serviceDataWithOffered = {
      ...serviceDataWithHours,
      services_offered: serviceDataWithHours.services_offered.split(","),
    };
    const validatedService = await validateAndFormatServiceData(
      serviceDataWithOffered,
      nonprofit
    );
    let error = exists ? "Service name already used in database" : "";
    if (!validatedService.valid) {
      error = validatedService.error + error;
    }
    //TODO Check for required fields

    if (error) {
      serviceDataWithOffered.error = error;
      formattedData.push({
        ...serviceDataWithOffered,
        language: serviceDataWithOffered.language.split(","),
        id: num++,
      });
    } else {
      // TODO print a message for what services have been successfully added
      await prisma.service.create({
        data: { ...validatedService.data, nonprofit_ID: nonprofit.id },
      });
    }
  }
  return formattedData;
}

//TODO Add documentation
function addHoursData(data) {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  let hours = days.map((day) => {
    const startKey = `${day}_start`;
    const endKey = `${day}_end`;

    if (!data[startKey] || !data[endKey]) {
      // No hours set → return closed
      delete data[startKey];
      delete data[endKey];
      return {
        start: "1899-12-31T00:00:00.000Z",
        end: "1899-12-31T00:00:00.000Z",
      };
    }

    const start = new Date(`1899-12-31 ${data[startKey]}`);
    const end = new Date(`1899-12-31 ${data[endKey]}`);
    delete data[startKey];
    delete data[endKey];
    return {
      start: start.toISOString(),
      end: end.toISOString(),
    };
  });
  data.hours = hours;
  return data;
}

import { errorReturn, successReturn } from "#utils/validate-utils.js";
import { Readable } from "stream";
import csv from "csv-parser";
import fs from "fs";

export async function importCSV(file, nonprofit) {
  let csvObject = await parseCSV(file);
  if (!csvObject.valid) {
    return errorReturn(csvObject.error);
  } else {
    csvObject = csvObject.data;
  }
  const formatCsvObject = formatCSVObject(csvObject);
  console.log(formatCsvObject[0]);
  return successReturn(formatCsvObject);
}

async function parseCSV(file) {
  const readableStream = Readable.from(file.buffer.toString()); // Convert buffer to string and create a readable stream
  const results = [];

  try {
    await new Promise((resolve, reject) => {
      readableStream
        .pipe(csv())
        .on("data", (data) => results.push(data)) // Collect parsed data rows
        .on("end", () => {
          console.log("CSV file successfully processed");
          resolve();
        })
        .on("error", (error) => {
          console.error("Error during CSV parsing:", error.message);
          reject(error);
        });
    });
  } catch (error) {
    return errorReturn(error.message);
  }
  return successReturn(results);
}

function extractJsonData(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
}

function formatCSVObject(csvObject) {
  let formattedData = [];
  for (const row of csvObject) {
    // Data validation and transformation before inserting into the database
    const serviceData = {
      ...row,
      addressInfo: extractJsonData(row.addressInfo),
      hours: extractJsonData(row.hours),
      language: extractJsonData(row.language),
      services_offered: extractJsonData(row.services_offered),
    };
    formattedData.push(serviceData);
  }
  return formattedData;
}

import { prisma } from "#utils/constants.js";
import csv from "csv-parser";
import fs from "fs";

async function importUsersFromCSV(filePath) {
  try {
    const results = [];

    // Create a readable stream from the CSV file and pipe it to csv-parser
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
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

    // Process the collected data and insert into the database
    for (const row of results) {
      // Data validation and transformation before inserting into the database
      const serviceData = {
        ...row,
        addressInfo: JSON.parse(row.addressInfo),
        hours: JSON.parse(row.hours),
        language: JSON.parse(row.language),
        services_offered: JSON.parse(row.services_offered),
      };

      let result = await prisma.service.create({
        data: serviceData,
      });
      console.log("Service imported successfully:", result);
      break;
    }

    // console.log("Users imported successfully!");
  } catch (error) {
    console.error("Error importing users:", error);
  }
  console.log("Finished importing users from CSV file");
}

async function deleteById(idToDelete) {
  try {
    await prisma.service.delete({
      where: { id: idToDelete },
    });
    console.log(`Item with ID ${idToDelete} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting item with ID ${idToDelete}:`, error);
  } finally {
    await prisma.$disconnect();
  }
}

const idToDelete1 = "daae85f1-bcc7-4201-9f67-a04bae6ec216";
deleteById(idToDelete1);

// Specify the path to your CSV file
const csvFilePath = "./services.csv";
importUsersFromCSV(csvFilePath);



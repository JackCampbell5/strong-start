import { prisma } from "#utils/constants.js";
import { stringify } from "csv-stringify";
import fs from "fs";

async function exportToCsv() {
  try {
    const services = await prisma.service.findMany(); // Fetch data from your model

    const columns = Object.keys(services[0]); // Get column headers from the first object
    const data = services.map((user) => Object.values(user)); // Extract values

    stringify(data, { header: true, columns: columns }, (err, output) => {
      if (err) throw err;
      fs.writeFileSync("services.csv", output);
      console.log("Data exported to services.csv");
    });
  } catch (error) {
    console.error("Error exporting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

exportToCsv();

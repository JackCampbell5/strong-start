import { PrismaClient } from "#prisma/client.js";
const prisma = new PrismaClient();
export async function generateStats(nonprofit) {
  console.log("Generating stats for nonprofit: " + nonprofit.id);
  let allServices = await prisma.service.findMany({
    where: { nonprofit_ID: nonprofit.id },
  });
  let servicesNumber = allServices.length;

  let servicesOffered = allServices.reduce((acc, service) => {
    return [...acc, ...service.services_offered];
  }, []);
  let serviceCount = [...new Set(servicesOffered)].length;

  let serviceZipcodes = allServices.reduce((acc, service) => {
    return [...acc, service.zipcode];
  }, []);
  console.log(serviceZipcodes);
  let zipResult = {};
  for (let a in serviceZipcodes) {
    let code = parseInt(serviceZipcodes[a]);
    if (zipResult[code]) {
      zipResult[code] += 1;
    } else {
      zipResult[code] = 1;
    }
  }
  console.log(zipResult);
  let popularZipCodeList = Object.keys(zipResult).sort().reverse();
  let popularZipCode;
  if (popularZipCodeList.length > 2) {
    popularZipCode =
      popularZipCodeList[0] +
      ", " +
      popularZipCodeList[1] +
      ", " +
      popularZipCodeList[2];
  } else if (popularZipCodeList.length > 1) {
    popularZipCode = popularZipCodeList[0] + ", " + popularZipCodeList[1];
  } else {
    popularZipCode = popularZipCodeList[0];
  }

  let result = {
    servicesNumber: { name: "Services #", key: servicesNumber },
    servicesOffered: { name: "Services offered", key: serviceCount },
    popularZipCode: { name: "Popular Zip Codes", key: popularZipCode },
  };
  return result;
}

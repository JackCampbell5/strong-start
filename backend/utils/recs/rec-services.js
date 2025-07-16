// Node Module Imports
import { PrismaClient } from "#prisma/client.js";
const prisma = new PrismaClient();

// Local Imports
import { errorReturn, successReturn } from "#utils/validate-utils.js";

export default async function recServices(nonprofit) {
  const foundServices = await prisma.service.findMany({
    where: {
      nonprofit_ID: nonprofit.id,
    },
  });
  return successReturn(foundServices);
}

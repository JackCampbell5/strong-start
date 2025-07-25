// Node Module Imports
import { prisma } from "#utils/constants.js";

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

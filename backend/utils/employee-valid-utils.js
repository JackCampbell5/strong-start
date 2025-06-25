import { PrismaClient } from "#prisma/client.js";
const prisma = new PrismaClient();

/**
 * Checks if a Employee exists with that name
 * @param {String} username The name to check
 * @returns True if it exists, false otherwise
 */
export async function checkEmployeeUsername(username, next) {
  try {
    let resultData = await prisma.nonprofit_employee.findUnique({
      where: {
        username: username,
      },
    });
    return resultData != null;
  } catch (e) {
    next(e);
  }
}

/**
 * Checks if a Employee exists with that id
 * @param {String} id The id to check
 * @returns True if it exists, false otherwise
 */
export async function checkEmployeeId(id, nonprofit, next) {
  try {
    let resultData = await prisma.nonprofit_employee.findUnique({
      where: {
        id: id,
      },
    });
    return resultData != null && nonprofit.id === resultData.nonprofit_ID;
  } catch (e) {
    next(e);
  }
}

export function secureEmployeeData(data) {
  const { password, ...secureEmployee } = data;
  return secureEmployee;
}

/**
 * Finds the data associated with a nonprofit's name
 * @param {String} name The name to search for
 * @returns The data associated with the nonprofit
 */
export async function getEmployeeData(username, next) {
  try {
    return await prisma.nonprofit_employee.findUnique({
      where: {
        username: username,
      },
    });
  } catch (e) {
    next(e);
  }
}

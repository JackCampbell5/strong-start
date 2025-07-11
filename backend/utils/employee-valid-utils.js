// Node Module Imports
import { PrismaClient } from "#prisma/client.js";

const prisma = new PrismaClient();

/**
 * Checks if a Employee exists with that name
 * @param {String} username The name to check
 * @returns True if it exists, false otherwise
 */
export async function checkEmployeeUsername(username, nonprofit, next) {
  try {
    const resultData = await prisma.nonprofit_employee.findUnique({
      where: {
        username: username,
      },
    });
    return (
      resultData !== null &&
      (nonprofit.id === resultData.nonprofit_ID || !nonprofit)
    );
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
    const resultData = await prisma.nonprofit_employee.findUnique({
      where: {
        id: id,
      },
    });
    return resultData !== null && nonprofit.id === resultData.nonprofit_ID;
  } catch (e) {
    next(e);
  }
}

/**
 * Secures an employee's data by removing their password
 * @param {object} data - The data to secure
 * @returns The secured data for an employee
 */
export function secureEmployeeData(data) {
  const { password, ...secureEmployee } = data;
  return secureEmployee;
}

/**
 * Finds the data associated with a employee's name
 * @param {String} name The name to search for
 * @returns The data associated with the employee
 */
export async function getEmployeeData(username, nonprofit, next) {
  try {
    return await prisma.nonprofit_employee.findUnique({
      where: {
        username: username,
        nonprofit_ID: nonprofit.id,
      },
    });
  } catch (e) {
    next(e);
  }
}

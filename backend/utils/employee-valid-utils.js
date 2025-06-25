import { PrismaClient } from "#prisma/client.js";
const prisma = new PrismaClient();

/**
 * Checks if a Employee exists with that name
 * @param {String} name The name to check
 * @returns True if it exists, false otherwise
 */
export async function checkEmployeeName(name, next) {
  try {
    let resultData = await prisma.nonprofit_employee.findUnique({
      where: {
        name: name,
      },
    });
    console.log(resultData != null);
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
export async function checkEmployeeId(id, next) {
  try {
    let resultData = await prisma.nonprofit_employee.findUnique({
      where: {
        id: id,
      },
    });
    return resultData != null;
  } catch (e) {
    next(e);
  }
}

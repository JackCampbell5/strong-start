import { PrismaClient } from "#prisma/client.js";
const prisma = new PrismaClient();

/**
 * Finds the data associated with a nonprofit's name
 * @param {String} name The name to search for
 * @returns The data associated with the nonprofit
 */
async function getNonProfitData(name) {
  return { name: name }; // Temp until we can create non profits
  // This would work but we can not create non profits yet
  // return await prisma.nonprofit.findUnique({
  //    where: {
  //      name: name,
  //    },
  //  })
}

/**
 * Extracts the nonprofit name from the request, fetches its data, and adds it to the request body
 * @param {Object} req Request object
 * @param {Object} res Result object
 * @param {Function} next The function to call next
 * @returns The result of the next function or a 404 if the non profit is not found
 */
export async function getNonProfit(req, res, next) {
  try {
    const name = req.params.nonprofitname;
    const data = await getNonProfitData(name);
    if (!data) {
      return res.status(404).json({ error: "Non-profit not found" });
    } else {
      if (!req.body) req.body = {};
      req.body.nonprofit = data;
      next();
    }
  } catch (error) {
    next(error);
  }
}

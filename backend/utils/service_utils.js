import { PrismaClient } from "#prisma/client.js";
const prisma = new PrismaClient();

/**
 * Checks if a nonprofit exists with that name
 * @param {String} name The name to check
 * @returns True if it exists, false otherwise
 */
export async function checkServiceName(name, nonprofit, next) {
  try {
    let resultData = await prisma.service.findUnique({
      where: {
        name: name,
        nonprofit_ID: nonprofit.id,
      },
    });
    console.log(resultData != null);
    return resultData != null;
  } catch (e) {
    next(e);
  }
}

/**
 * Checks if a nonprofit exists with that id
 * @param {String} id The id to check
 * @returns True if it exists, false otherwise
 */
export async function checkServiceId(id, nonprofit, next) {
  try {
    let resultData = await prisma.service.findUnique({
      where: {
        id: id,
        nonprofit_ID: nonprofit.id,
      },
    });
    return resultData != null;
  } catch (e) {
    next(e);
  }
}

// /**
//  * Finds the data associated with a nonprofit's name
//  * @param {String} name The name to search for
//  * @returns The data associated with the nonprofit
//  */
// async function getServiceData(name, next) {
//   try {
//     return await prisma.nonprofit.findUnique({
//       where: {
//         name: name,
//       },
//     });
//   } catch (e) {
//     next(e);
//   }
// }

// /**
//  * Extracts the nonprofit name from the request, fetches its data, and adds it to the request body
//  * @param {Object} req Request object
//  * @param {Object} res Result object
//  * @param {Function} next The function to call next
//  * @returns The result of the next function or a 404 if the non profit is not found
//  */
// export async function getService(req, res, next) {
//   try {
//     const name = req.params.nonprofitname;
//     const data = await getServiceData(name, next);
//     if (!data) {
//       return res.status(404).json({ error: "Non-profit not found" });
//     } else {
//       if (!req.body) req.body = {};
//       req.body.nonprofit = data;
//       next();
//     }
//   } catch (error) {
//     next(error);
//   }
// }

import { PrismaClient } from "#prisma/client.js";
import express from "express";
import {
  checkNonProfitName,
  checkNonProfitId,
} from "#utils/nonprofit_utils.js";
import {
  NonProfitNotFoundError,
  NonProfitAlreadyExistsError,
} from "#errors/nonprofit-errors.js";
const prisma = new PrismaClient();
const nonprofitRouter = express.Router();

// Default is to get all nonprofits
nonprofitRouter.get("/", async (req, res, next) => {
  res.status(200).json({ message: "Nonprofit route" });
});

// Get all nonprofits
nonprofitRouter.get("/all", async (req, res, next) => {
  try {
    const foundNonProfits = await prisma.nonprofit.findMany();
    res.status(200).json(foundNonProfits);
  } catch (e) {
    return next(e);
  }
});

// Get one nonprofit by name
nonprofitRouter.get("/:nonprofit_name", async (req, res, next) => {
  const { nonprofit_name } = req.params;
  try {
    const findNonProfit = await prisma.nonprofit.findUnique({
      where: {
        name: nonprofit_name,
      },
    });
    if (findNonProfit) {
      res.status(200).json(findNonProfit);
    } else {
      throw new NonProfitNotFoundError(nonprofit_name);
    }
  } catch (e) {
    return next(e);
  }
});

// Get one nonprofit by id
nonprofitRouter.get("/id/:nonprofit_id", async (req, res, next) => {
  const { nonprofit_id } = req.params;
  try {
    const findNonProfit = await prisma.nonprofit.findUnique({
      where: {
        id: nonprofit_id,
      },
    });
    if (findNonProfit) {
      res.status(200).json(findNonProfit);
    } else {
      throw new NonProfitNotFoundError(nonprofit_id);
    }
  } catch (e) {
    return next(e);
  }
});

// Add a new nonprofit by id
nonprofitRouter.post("/add", async (req, res, next) => {
  const nonProfitData = req.body;
  const name = nonProfitData.name;
  try {
    const exists = await checkNonProfitName(name, next);

    if (!exists) {
      const createNonProfit = await prisma.nonprofit.create({
        data: nonProfitData,
      });
      res.status(201).json(createNonProfit);
    } else {
      throw new NonProfitAlreadyExistsError(name);
    }
  } catch (e) {
    return next(e);
  }
});

// Edit a nonprofit by id
nonprofitRouter.put("/:nonprofit_id/edit", async (req, res, next) => {
  const { nonprofit_id } = req.params;
  const nonProfitData = req.body;
  try {
    const exists = await checkNonProfitId(nonprofit_id, next);

    if (exists) {
      const updateOne = await prisma.nonprofit.update({
        where: {
          id: nonprofit_id,
        },
        data: nonProfitData,
      });
      res.json(updateOne);
      res.status(200).send();
    } else {
      throw NonProfitNotFoundError(nonprofit_id);
    }
  } catch (e) {
    return next(e);
  }
});

// Delete a nonprofit by id
nonprofitRouter.delete("/:nonprofit_id/delete", async (req, res, next) => {
  const { nonprofit_id } = req.params;
  try {
    const exists = await checkNonProfitId(nonprofit_id, next);

    if (exists) {
      await prisma.nonprofit_employee.deleteMany({
        where: { nonprofit_ID: nonprofit_id },
      });
      await prisma.nonprofit.delete({
        where: {
          id: nonprofit_id,
        },
      });
      res.status(200).send(`Nonprofit ${nonprofit_id} deleted`);
    } else {
      throw new NonProfitNotFoundError(nonprofit_id);
    }
  } catch (e) {
    return next(e);
  }
});

nonprofitRouter.use((err, req, res, next) => {
  const retStr = `${err.name}: ${err.message}`;
  if (err instanceof NonProfitNotFoundError) {
    return res.status(404).send(retStr);
  } else if (err instanceof NonProfitAlreadyExistsError) {
    return res.status(409).send(retStr);
  } else {
    return res.status(500).send(retStr);
  }
});

export default nonprofitRouter;

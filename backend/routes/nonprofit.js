import { PrismaClient } from "#prisma/client.js";
import express from "express";
import {
  checkNonProfitName,
  checkNonProfitId,
} from "#utils/nonprofit_utils.js";
const prisma = new PrismaClient();
const nonprofitRouter = express.Router();

// Default is to get all nonprofits
nonprofitRouter.get("/", async (req, res) => {
  const foundNonProfits = await prisma.nonprofit.findMany();
  res.status(200).json(foundNonProfits);
});

// Get one nonprofit by name
nonprofitRouter.get("/:nonprofit_name", async (req, res) => {
  const { nonprofit_name } = req.params;
  const findNonProfit = await prisma.nonprofit.findUnique({
    where: {
      name: nonprofit_name,
    },
  });
  if (findNonProfit) {
    res.status(200).json(findNonProfit);
  } else {
    res.status(404).send(`Nonprofit ${nonprofit_name} not found`);
  }
});

// Get one nonprofit by id
nonprofitRouter.get("/id/:nonprofit_id", async (req, res) => {
  const { nonprofit_id } = req.params;
  const findNonProfit = await prisma.nonprofit.findUnique({
    where: {
      id: nonprofit_id,
    },
  });
  if (findNonProfit) {
    res.status(200).json(findNonProfit);
  } else {
    res.status(404).send(`Nonprofit ${nonprofit_id} not found`);
  }
});

// Add a new nonprofit by id
nonprofitRouter.post("/add", async (req, res) => {
  const nonProfitData = req.body;
  const name = nonProfitData.name;
  const exists = await checkNonProfitName(name);

  if (!exists) {
    const createNonProfit = await prisma.nonprofit.create({
      data: nonProfitData,
    });
    res.status(201).json(createNonProfit);
  } else {
    res.status(400).send(`Nonprofit ${name} already exists`);
  }
});

// Edit a nonprofit by id
nonprofitRouter.put("/:nonprofit_id/edit", async (req, res) => {
  const { nonprofit_id } = req.params;
  const nonProfitData = req.body;
  const exists = await checkNonProfitId(nonprofit_id);

  if (exists) {
    const updateOne = await prisma.nonprofit.update({
      where: {
        id: nonprofit_id,
      },
      data: nonProfitData,
    });
    res.json(updateOne);
    res.status(214).send();
  } else {
    res.status(404).send(`Nonprofit ${nonprofit_id} not found`);
  }
});

// Delete a nonprofit by id
nonprofitRouter.delete("/:nonprofit_id/delete", async (req, res) => {
  const { nonprofit_id } = req.params;
  const exists = await checkNonProfitId(nonprofit_id);

  if (exists) {
    await prisma.nonprofit.delete({
      where: {
        id: nonprofit_id,
      },
    });
    res.status(214).send(`Nonprofit ${nonprofit_id} deleted`);
  } else {
    res.status(404).send(`Nonprofit ${nonprofit_id} not found`);
  }
});

export default nonprofitRouter;

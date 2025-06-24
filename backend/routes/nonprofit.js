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
  res.status(200).json({ message: "Nonprofit route" });
});

// Get all nonprofits
nonprofitRouter.get("/all", async (req, res) => {
  const foundNonProfits = await prisma.nonprofit.findMany();
  res.status(200).json(foundNonProfits);
});

// Get one nonprofit by name
nonprofitRouter.get("/:nonprofitname", async (req, res) => {
  const { nonprofitname } = req.params;
  const findCard = await prisma.nonprofit.findUnique({
    where: {
      name: nonprofitname,
    },
  });
  res.status(200).json(findCard);
});

// Add a new nonprofit by name
nonprofitRouter.post("/add", async (req, res) => {
  const nonProfitData = req.body;
  const name = nonProfitData.name;

  const findCards = await prisma.nonprofit.findUnique({
    where: {
      name: name,
    },
  });
  if (!findCards) {
    const createNonProfit = await prisma.nonprofit.create({
      data: nonProfitData,
    });
    res.status(201).json(createNonProfit);
  } else {
    req.status(400).json({ message: "Nonprofit already exists" });
  }
});

// Edit a nonprofit by name
nonprofitRouter.put("/:nonprofitname/edit", async (req, res) => {
  const { nonprofitname } = req.params;
  const nonProfitData = req.body;
  try {
    const updateOne = await prisma.nonprofit.update({
      where: {
        name: nonprofitname,
      },

      data: nonProfitData,
    });
    res.json(updateOne);
    res.status(214).send();
  } catch (PrismaClientKnownRequestError) {
    res.status(404).send("Nonprofit not found");
  }
});

// Delete a nonprofit by name
nonprofitRouter.delete("/:nonprofitname/delete", async (req, res) => {
  const { nonprofitname } = req.params;
  try {
    await prisma.nonprofit.delete({
      where: {
        name: nonprofitname,
      },
    });
    res.status(214).send();
  } catch (PrismaClientKnownRequestError) {
    res.status(404).send("Nonprofit not found");
  }
});

export default nonprofitRouter;

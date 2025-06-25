import { PrismaClient } from "#prisma/client.js";
import express from "express";
const prisma = new PrismaClient();
const serviceRouter = express.Router();

serviceRouter.get("/", (req, res) => {
  res.send("Welcome to a nonprofits service database!");
});

export default serviceRouter;

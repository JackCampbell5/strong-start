// Node Module Imports
import { PrismaClient } from "#prisma/client.js";
import express from "express";

const prisma = new PrismaClient();
const refugeeRouter = express.Router();

// TODO - Implement routes for refugee as a part of stretch goal
refugeeRouter.get("/", (req, res) => {
  res.send("Welcome refugee!");
});

export default refugeeRouter;

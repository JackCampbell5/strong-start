// Node Module Imports
import { prisma } from "#utils/constants.js";
import express from "express";

const refugeeRouter = express.Router();

// TODO - Implement routes for refugee as a part of stretch goal
refugeeRouter.get("/", (req, res) => {
  res.send("Welcome refugee!");
});

export default refugeeRouter;

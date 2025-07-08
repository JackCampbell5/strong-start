// Routes starting with /api/v1
import { PrismaClient } from "#prisma/client.js";
import express from "express";
import { getNonProfit } from "#utils/nonprofit_utils.js";
import { NonProfitNotFoundError } from "#errors/nonprofit-errors.js";

// Import routes
import employeeRouter from "#apiroutes/nonprofit-employee.js";
import nonprofitRouter from "#apiroutes/nonprofit.js";
import refugeeRouter from "#apiroutes/refugee.js";
import serviceRouter from "#apiroutes/service.js";

const prisma = new PrismaClient();
const apiRouter = express.Router();

// Default route for /api/v1
apiRouter.get("/", (req, res) => {
  res.send("Welcome to API V1!");
});

// START nonprofit
// Route for /api/v1/nonprofit
apiRouter.use("/nonprofit/", nonprofitRouter);

// START nonprofit-employee
// Route for /api/v1/nonprofit-employee
apiRouter.get("/nonprofit-employee", (req, res) => {
  // DEBUG This endpoint should never return anything but is currently located here for debugging purposes
  res.send("Non Profit employee endpoint!");
});

// Route for /api/v1/nonprofit-employee/:nonprofitname
apiRouter.use(
  "/nonprofit-employee/:nonprofitname",
  getNonProfit,
  employeeRouter
);

// START refugee
// Route for /api/v1/refugee
apiRouter.get("/refugee", (req, res) => {
  // DEBUG This endpoint should never return anything but is currently located here for debugging purposes
  res.send("Refugee endpoint!");
});

// Route for /api/v1/refugee/:nonprofitname
apiRouter.use("/refugee/:nonprofitname", getNonProfit, refugeeRouter);

// START service
// Route for /api/v1/service
apiRouter.get("/service", (req, res) => {
  // DEBUG This endpoint should never return anything but is currently located here for debugging purposes
  res.send("Service overall endpoint!");
});

// Route for /api/v1/service/:nonprofitname
apiRouter.use("/service/:nonprofitname", getNonProfit, serviceRouter);

apiRouter.use((err, req, res, next) => {
  const retStr = `${err.name}: ${err.message}`;
  if (err instanceof NonProfitNotFoundError) {
    return res.status(404).send(retStr);
  } else {
    return res.status(500).send(retStr);
  }
});

export default apiRouter;

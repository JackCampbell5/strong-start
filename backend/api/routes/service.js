import { PrismaClient } from "#prisma/client.js";
import express from "express";
import { checkServiceName, checkServiceId } from "#utils/service_utils.js";
import {
  ServiceNotFoundError,
  ServiceAlreadyExistsError,
} from "#errors/service-errors.js";
const prisma = new PrismaClient();
const serviceRouter = express.Router();

serviceRouter.get("/", (req, res) => {
  const nonprofit = req.body.nonprofit;
  res.send(`Welcome to ${nonprofit.name}'s service database!`);
});

// Get all services
serviceRouter.get("/all", async (req, res, next) => {
  try {
    const nonprofit = req.body.nonprofit;
    const foundServices = await prisma.service.findMany({
      where: {
        nonprofit_ID: nonprofit.id,
      },
    });
    if (foundServices.length !== 0) {
      res.status(200).json(foundServices);
    } else {
      res.status(404).send("No services found");
    }
  } catch (e) {
    return next(e);
  }
});

// Get all services
serviceRouter.get("/search", async (req, res, next) => {
  try {
    const nonprofit = req.body.nonprofit;
    let query = req.query;
    // TODO make a search algorithm that uses these params to search
    const foundServices = await prisma.service.findMany({
      where: {
        nonprofit_ID: nonprofit.id,
      },
    });
    if (foundServices.length !== 0) {
      res.status(200).json(foundServices);
    } else {
      res.status(404).send("No services found");
    }
  } catch (e) {
    return next(e);
  }
});

// Get all services in dropdown format
serviceRouter.get("/all/name-list", async (req, res, next) => {
  try {
    const nonprofit = req.body.nonprofit;
    const foundServices = await prisma.service.findMany({
      where: {
        nonprofit_ID: nonprofit.id,
      },
    });
    if (foundServices.length !== 0) {
      let after = foundServices.map((service) => ({
        id: service.id,
        text: service.name,
      }));
      res.status(200).json(after);
    } else {
      res.status(404).send("No services found");
    }
  } catch (e) {
    return next(e);
  }
});

// Get one service by name
serviceRouter.get("/name/:service_name", async (req, res, next) => {
  const { service_name } = req.params;
  const nonprofit = req.body.nonprofit;
  try {
    const findService = await prisma.service.findMany({
      where: {
        name: service_name,
        nonprofit_ID: nonprofit.id,
      },
    });
    //If the find returns results
    if (findService) {
      // Make sure there is only one service with the same name
      if (findService.length !== 1) {
        throw new Error(
          "Multiple services with the same name in one nonprofit found"
        );
      }
      res.status(200).json(findService);
    } else {
      throw new ServiceNotFoundError(service_name);
    }
  } catch (e) {
    return next(e);
  }
});

// Get one service by id
serviceRouter.get("/:service_id", async (req, res, next) => {
  const { service_id } = req.params;
  const nonprofit = req.body.nonprofit;
  try {
    const findService = await prisma.service.findUnique({
      where: {
        id: service_id,
        nonprofit_ID: nonprofit.id,
      },
    });
    if (findService) {
      res.status(200).json(findService);
    } else {
      throw new ServiceNotFoundError(service_id);
    }
  } catch (e) {
    return next(e);
  }
});

// Get one service by id
serviceRouter.get("/:service_id/get-edit", async (req, res, next) => {
  const { service_id } = req.params;
  const nonprofit = req.body.nonprofit;
  try {
    const findService = await prisma.service.findUnique({
      where: {
        id: service_id,
        nonprofit_ID: nonprofit.id,
      },
    });
    if (findService) {
      // Remove the nonprofit_ID and id from the object
      delete findService.nonprofit_ID;
      delete findService.id;
      findService.services_offered = findService.services_offered.join(", ");
      // Reformat for frontend
      const keys = Object.keys(findService);
      const values = Object.values(findService);
      let after = keys.map((key, i) => ({
        id: key,
        value: values[i] ? values[i] : "",
      }));
      res.status(200).json(after);
    } else {
      throw new ServiceNotFoundError(service_id);
    }
  } catch (e) {
    return next(e);
  }
});

// Add a new service by id
serviceRouter.post("/add", async (req, res, next) => {
  const serviceData = req.body.data;
  const name = serviceData.name;
  const nonprofit = req.body.nonprofit;
  try {
    const exists = await checkServiceName(name, nonprofit, next);

    if (!exists) {
      const createService = await prisma.service.create({
        data: { ...serviceData, nonprofit_ID: nonprofit.id },
      });
      res.status(201).json(createService);
    } else {
      throw new ServiceAlreadyExistsError(name);
    }
  } catch (e) {
    return next(e);
  }
});

// Edit a service by id
serviceRouter.put("/:service_id/edit", async (req, res, next) => {
  const { service_id } = req.params;
  const serviceData = req.body;
  const nonprofit = req.body.nonprofit;
  const updatedData = req.body.data;
  try {
    const exists = await checkServiceId(service_id, nonprofit, next);

    if (exists) {
      const updateOne = await prisma.service.update({
        where: {
          id: service_id,
        },
        data: updatedData,
      });
      res.json(updateOne);
      res.status(200).send();
    } else {
      throw new ServiceNotFoundError(service_id);
    }
  } catch (e) {
    return next(e);
  }
});

// Delete a service by id
serviceRouter.delete("/:service_id/delete", async (req, res, next) => {
  const { service_id } = req.params;
  const nonprofit = req.body.nonprofit;
  try {
    const exists = await checkServiceId(service_id, nonprofit, next);

    if (exists) {
      await prisma.service.delete({
        where: {
          id: service_id,
        },
      });
      res.status(200).send(`Nonprofit ${service_id} deleted`);
    } else {
      throw new ServiceNotFoundError(service_id);
    }
  } catch (e) {
    return next(e);
  }
});

serviceRouter.use((err, req, res, next) => {
  const retStr = `${err.name}: ${err.message}`;
  if (err instanceof ServiceNotFoundError) {
    return res.status(404).send(retStr);
  } else if (err instanceof ServiceAlreadyExistsError) {
    return res.status(409).send(retStr);
  } else {
    return res.status(500).send(retStr);
  }
});

export default serviceRouter;

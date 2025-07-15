// Node Module Imports
import { PrismaClient } from "#prisma/client.js";
import express from "express";

// Local Imports
import {
  ServiceNotFoundError,
  ServiceAlreadyExistsError,
} from "#errors/service-errors.js";
import {
  checkServiceName,
  checkServiceId,
  validateServiceData,
} from "#utils/service-utils.js";
import { createErrorReturn } from "#utils/error-utils.js";
import searchServices from "#search/search-services.js";
import createFilter from "#utils/filter-create-utils.js";

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

// Get the service filters for a given nonprofit
serviceRouter.get("/filters", async (req, res, next) => {
  try {
    const nonprofit = req.body.nonprofit;
    return res.status(200).json(await createFilter(nonprofit));
  } catch (e) {
    return next(e);
  }
});

// Get all services
serviceRouter.get("/search", async (req, res, next) => {
  try {
    const nonprofit = req.body.nonprofit;
    const query = req.query;
    let result = await searchServices(query, nonprofit);
    if (result.valid) {
      res.status(200).json(result.data);
    } else {
      res.status(404).send(result.error);
    }
  } catch (e) {
    return next(e);
  }
});

// Get all services in dropdown format
serviceRouter.get("/all/name-list", async (req, res, next) => {
  if (!req.session.employee) {
    res.status(401).send("Unauthorized: Please log in");
    return;
  }
  try {
    const nonprofit = req.body.nonprofit;
    const foundServices = await prisma.service.findMany({
      where: {
        nonprofit_ID: nonprofit.id,
      },
    });
    if (foundServices.length !== 0) {
      const after = foundServices.map((service) => ({
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
  if (!req.session.employee) {
    res.status(401).send("Unauthorized: Please log in");
    return;
  }
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
      let findServiceCopy = JSON.parse(JSON.stringify(findService));
      delete findServiceCopy.nonprofit_ID;
      delete findServiceCopy.id;
      delete findServiceCopy.addressInfo;
      findServiceCopy.services_offered =
        findServiceCopy.services_offered.join(", ");
      findServiceCopy.language = findServiceCopy.language.join(", ");
      // Reformat for frontend
      const keys = Object.keys(findServiceCopy);
      const values = Object.values(findServiceCopy);
      const after = keys.map((key, i) => ({
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
  if (!req.session.employee) {
    res.status(401).send("Unauthorized: Please log in");
    return;
  }
  const serviceData = req.body.data;
  const name = serviceData.name;
  const nonprofit = req.body.nonprofit;
  try {
    const exists = await checkServiceName(name, nonprofit, next);
    const validatedService = await validateServiceData(serviceData, nonprofit);

    if (!exists) {
      if (validatedService.valid) {
        const createService = await prisma.service.create({
          data: { ...validatedService.data, nonprofit_ID: nonprofit.id },
        });
        res.status(201).json(createService);
      } else {
        throw new Error(validatedService.error);
      }
    } else {
      throw new ServiceAlreadyExistsError(name);
    }
  } catch (e) {
    return next(e);
  }
});

// Edit a service by id
serviceRouter.put("/:service_id/edit", async (req, res, next) => {
  if (!req.session.employee) {
    res.status(401).send("Unauthorized: Please log in");
    return;
  }
  const { service_id } = req.params;
  const nonprofit = req.body.nonprofit;
  const updatedData = req.body.data;
  console.log(updatedData);
  try {
    const exists = await checkServiceId(service_id, nonprofit, next);
    const validatedService = await validateServiceData(updatedData, nonprofit);

    if (exists) {
      if (validatedService.valid) {
        const updateOne = await prisma.service.update({
          where: {
            id: service_id,
          },
          data: validatedService.data,
        });
        res.json(updateOne);
        res.status(200).send();
      } else {
        throw new Error(validatedService.error);
      }
    } else {
      throw new ServiceNotFoundError(service_id);
    }
  } catch (e) {
    return next(e);
  }
});

// Delete a service by id
serviceRouter.delete("/:service_id/delete", async (req, res, next) => {
  if (!req.session.employee) {
    res.status(401).send("Unauthorized: Please log in");
    return;
  }
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
  if (err instanceof ServiceNotFoundError) {
    return res.status(404).send(createErrorReturn(err));
  } else if (err instanceof ServiceAlreadyExistsError) {
    return res.status(409).send(createErrorReturn(err));
  } else {
    return res.status(500).send(createErrorReturn(err));
  }
});

export default serviceRouter;

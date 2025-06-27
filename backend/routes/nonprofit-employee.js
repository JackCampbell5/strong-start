// Imports from node_modules
import { PrismaClient } from "#prisma/client.js";
import express from "express";
// Imports from my stuff
import {
  checkEmployeeUsername,
  checkEmployeeId,
  secureEmployeeData,
  getEmployeeData,
} from "#utils/employee-valid-utils.js";
import { hashPassword, verifyPassword } from "#utils/auth-utils.js";
import {
  EmployeeNotFoundError,
  EmployeeUsernameTakenError,
  EmployeeLogInError,
} from "#errors/employee-errors.js";

const prisma = new PrismaClient();
const employeeRouter = express.Router();

// Default is to get all nonprofits
employeeRouter.get("/", async (req, res, next) => {
  const findNonProfits = await prisma.nonprofit_employee.findMany();
  // Hide the password
  for (let a of findNonProfits) {
    a.password = "*********";
  }
  res.status(200).json(findNonProfits);
});

// Get one nonprofit by id (No get by name for security)
employeeRouter.get("/:employee_id", async (req, res, next) => {
  const { employee_id } = req.params;
  try {
    const findEmployee = await prisma.nonprofit_employee.findUnique({
      where: {
        id: employee_id,
      },
    });

    // Remove password from response just in case
    if (findEmployee) {
      const secureEmployee = secureEmployeeData(findEmployee);
      res.status(200).json(secureEmployee);
    } else {
      throw new EmployeeNotFoundError(employee_id);
    }
  } catch (e) {
    return next(e);
  }
});

// Register a new non profit employee
employeeRouter.post("/register", async (req, res, next) => {
  // I believe it does not mater what non profit they are trying to sign into here for sign up as usernames have to be unique anyways.
  const employeeData = req.body.data;
  const username = employeeData.username;
  const nonprofit = req.body.nonprofit;
  try {
    const exists = await checkEmployeeUsername(username, "", next);
    if (!exists) {
      // Hash the password
      const plainPassword = employeeData.password;
      const hash = await hashPassword(plainPassword);
      employeeData.password = hash;
      employeeData["nonprofit_ID"] = nonprofit.id;

      // Create the employee
      const createEmployee = await prisma.nonprofit_employee.create({
        data: employeeData,
      });

      // Return the employee without the password
      const secureEmployee = secureEmployeeData(createEmployee);
      res.status(201).json(secureEmployee);
    } else {
      throw new EmployeeUsernameTakenError(username);
    }
  } catch (e) {
    return next(e);
  }
});

// Register a new non profit employee
employeeRouter.post("/login", async (req, res, next) => {
  const { username, password: plainPassword } = req.body;
  const nonprofit = req.body.nonprofit;
  try {
    const exists = await checkEmployeeUsername(username, nonprofit, next);
    if (exists) {
      // Hash the password
      const employeeData = await getEmployeeData(username, next);
      if (await verifyPassword(plainPassword, employeeData.password)) {
        // TODO SESSION - Add when session is implemented
        // req.session.user = user; // Added to session

        // Return the employee without the password
        const secureEmployee = secureEmployeeData(employeeData);
        res.status(201).json(secureEmployee);
      } else {
        throw new EmployeeLogInError(username);
      }
    } else {
      throw new EmployeeNotFoundError(username);
    }
  } catch (e) {
    return next(e);
  }
});

// TODO SESSION - Add when session is implemented
// // Logout a user
// employeeRouter.post("/logout", (req, res, next) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.log("Error destroying session:", err);
//       next({ message: "Logout failed" });
//     } else {
//       res.clearCookie("sessionId");
//       res.json({ message: "👋 Logged out" });
//     }
//   });
// });

// Edit a employee by name
employeeRouter.put("/:employee_id/edit", async (req, res, next) => {
  const { employee_id } = req.params;
  const employeeData = req.body.data;
  const nonprofit = req.body.nonprofit;
  try {
    const exists = await checkEmployeeId(employee_id, nonprofit, next);
    if (exists) {
      // If employee gives a new password, hash it
      if (employeeData.password) {
        const hash = await hashPassword(employeeData.password);
        employeeData.password = hash;
      }

      // Update the employee
      const updateOne = await prisma.nonprofit_employee.update({
        where: {
          id: employee_id,
        },
        data: employeeData,
      });
      res.json(updateOne);
      res.status(200).send();
    } else {
      throw new EmployeeNotFoundError(employee_id);
    }
  } catch (e) {
    return next(e);
  }
});

// Delete a nonprofit by name
employeeRouter.delete("/:employee_id/delete", async (req, res, next) => {
  const { employee_id } = req.params;
  const nonprofit = req.body.nonprofit;
  try {
    const exists = await checkEmployeeId(employee_id, nonprofit, next);
    if (exists) {
      await prisma.nonprofit_employee.delete({
        where: {
          id: employee_id,
        },
      });
      res.status(200).send();
    } else {
      throw new EmployeeNotFoundError(employee_id);
    }
  } catch (e) {
    return next(e);
  }
});

// Error handling
employeeRouter.use((err, req, res, next) => {
  const retStr = `${err.name}: ${err.message}`;
  if (
    err instanceof EmployeeNotFoundError ||
    err instanceof EmployeeLogInError
  ) {
    return res.status(404).send(retStr);
  } else if (err instanceof EmployeeUsernameTakenError) {
    return res.status(409).send(retStr);
  } else {
    return res.status(500).send(retStr);
  }
});

export default employeeRouter;

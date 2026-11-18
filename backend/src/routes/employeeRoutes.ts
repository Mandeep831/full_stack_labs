
import { Router } from "express";

import {
  getDepartments,
  getEmployees,
  createEmployee,
  deleteEmployee,
} from "../controllers/employeeController";

import { validateRequest } from "../middleware/validateRequest";
import { validateEmployee } from "../middleware/requestvalidators";

const router = Router();

router.get("/departments", getDepartments);
router.get("/", getEmployees);

router.post(
  "/",
  validateRequest(validateEmployee),
  createEmployee
);

router.delete("/", deleteEmployee);

export default router;

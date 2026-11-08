import { Router } from "express";

import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/roleController";

import { validateRequest } from "../middleware/validateRequest";
import { validateRole } from "../middleware/requestvalidators";

const router = Router();

router.get("/", getRoles);

router.post(
  "/",
  validateRequest(validateRole),
  createRole
);

router.put(
  "/:oldRoleName",
  validateRequest(validateRole),
  updateRole
);

router.delete("/:roleName", deleteRole);

export default router;
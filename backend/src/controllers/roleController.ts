import type { Request, Response } from "express";

import {
  getAllRoles,
  addRole,
  editRole,
  removeRole,
} from "../services/roleService";

export function getRoles(
  req: Request,
  res: Response
): void {
  res.status(200).json(getAllRoles());
}

export function createRole(
  req: Request,
  res: Response
): void {
  const result = addRole(req.body);

  if (typeof result === "string") {
    res.status(400).json({ message: result });
    return;
  }

  res.status(201).json(result);
}

export function updateRole(
  req: Request,
  res: Response
): void {
  const oldRoleName = String(req.params.oldRoleName);
  const result = editRole(oldRoleName, req.body);

  if (typeof result === "string") {
    res.status(400).json({ message: result });
    return;
  }

  res.status(200).json(result);
}

export function deleteRole(
  req: Request,
  res: Response
): void {
  const deleted = removeRole(String(req.params.roleName));

  if (!deleted) {
    res.status(404).json({ message: "Role not found." });
    return;
  }

  res.status(204).send();
}
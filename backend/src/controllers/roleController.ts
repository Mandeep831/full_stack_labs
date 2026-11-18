import type { Request, Response } from "express";

import {
  getAllRoles,
  addRole,
  editRole,
  removeRole,
} from "../services/roleService";

export async function getRoles(
  req: Request,
  res: Response
): Promise<void> {
  const roles = await getAllRoles();
  res.status(200).json(roles);
}

export async function createRole(
  req: Request,
  res: Response
): Promise<void> {
  const result = await addRole(req.body);

  if (typeof result === "string") {
    res.status(400).json({ message: result });
    return;
  }

  res.status(201).json(result);
}

export async function updateRole(
  req: Request,
  res: Response
): Promise<void> {
  const oldRoleName = String(req.params.oldRoleName);
  const result = await editRole(oldRoleName, req.body);

  if (typeof result === "string") {
    res.status(400).json({ message: result });
    return;
  }

  res.status(200).json(result);
}

export async function deleteRole(
  req: Request,
  res: Response
): Promise<void> {
  const deleted = await removeRole(String(req.params.roleName));

  if (!deleted) {
    res.status(404).json({ message: "Role not found." });
    return;
  }

  res.status(204).send();
}

import type { Role } from "../../../shared/types/Role.js" with {
  "resolution-mode": "import",
};

import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../repositories/roleRepository";

export async function getAllRoles(): Promise<Role[]> {
  return getRoles();
}

export async function addRole(
  newRole: Role
): Promise<Role | string> {
  const firstName = newRole.firstName.trim();
  const lastName = newRole.lastName.trim();
  const roleName = newRole.role.trim();

  if (firstName.length < 3) {
    return "First name must be at least 3 characters long.";
  }

  if (!lastName) {
    return "Last name is required.";
  }

  if (!roleName) {
    return "Role is required.";
  }

  const createdRole = await createRole({
    firstName,
    lastName,
    role: roleName,
  });

  if (!createdRole) {
    return "This role is already occupied.";
  }

  return createdRole;
}

export async function editRole(
  oldRoleName: string,
  updatedRole: Role
): Promise<Role | string> {
  const firstName = updatedRole.firstName.trim();
  const lastName = updatedRole.lastName.trim();
  const roleName = updatedRole.role.trim();

  if (firstName.length < 3) {
    return "First name must be at least 3 characters long.";
  }

  if (!lastName) {
    return "Last name is required.";
  }

  if (!roleName) {
    return "Role is required.";
  }

  const result = await updateRole(oldRoleName, {
    firstName,
    lastName,
    role: roleName,
  });

  return result ?? "Role not found or already occupied.";
}

export async function removeRole(
  roleName: string
): Promise<boolean> {
  return deleteRole(roleName);
}

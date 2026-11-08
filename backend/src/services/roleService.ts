import type { Role } from "../../../shared/types/Role.js" with {
  "resolution-mode": "import",
};

import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../repositories/roleRepository";

export function getAllRoles(): Role[] {
  return getRoles();
}

export function addRole(newRole: Role): Role | string {
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

  const createdRole = createRole({
    firstName,
    lastName,
    role: roleName,
  });

  if (!createdRole) {
    return "This role is already occupied.";
  }

  return createdRole;
}

export function editRole(
  oldRoleName: string,
  updatedRole: Role
): Role | string {
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

  const result = updateRole(oldRoleName, {
    firstName,
    lastName,
    role: roleName,
  });

  return result ?? "Role not found or already occupied.";
}

export function removeRole(roleName: string): boolean {
  return deleteRole(roleName);
}

import type { Role } from '../interfaces/Role';
import { roles } from '../interfaces/Role';

let roleData: Role[] = roles;

export function getRoles(): Role[] {
  return roleData;
}

export function createRole(newRole: Role): Role | null {
  const roleExists = roleData.some(
    (person) =>
      person.role.trim().toLowerCase() ===
      newRole.role.trim().toLowerCase()
  );

  if (roleExists) {
    return null;
  }

  roleData = [...roleData, newRole];

  return newRole;
}

export function updateRole(
  oldRoleName: string,
  updatedRole: Role
): Role | null {
  const index = roleData.findIndex(
    (person) => person.role === oldRoleName
  );

  if (index === -1) {
    return null;
  }

  const duplicateRole = roleData.some(
    (person) =>
      person.role.trim().toLowerCase() ===
        updatedRole.role.trim().toLowerCase() &&
      person.role !== oldRoleName
  );

  if (duplicateRole) {
    return null;
  }

  roleData = roleData.map((person, currentIndex) =>
    currentIndex === index ? updatedRole : person
  );

  return updatedRole;
}

export function deleteRole(roleName: string): boolean {
  const originalLength = roleData.length;

  roleData = roleData.filter(
    (person) => person.role !== roleName
  );

  return roleData.length < originalLength;
}

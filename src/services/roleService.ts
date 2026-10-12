
import type { Role } from '../interfaces/Role';
import { createRole, getRoles } from '../apis/roleRepo';

export function addRole(newRole: Role): {
  role: Role | null;
  error: string;
} {
  const firstName = newRole.firstName.trim();
  const lastName = newRole.lastName.trim();
  const roleName = newRole.role.trim();

  if (firstName.length < 3) {
    return {
      role: null,
      error: 'First name must be at least 3 characters long.',
    };
  }

  if (!lastName) {
    return {
      role: null,
      error: 'Last name is required.',
    };
  }

  if (!roleName) {
    return {
      role: null,
      error: 'Role is required.',
    };
  }

  const existingRole = getRoles().some(
    (person) =>
      person.role.trim().toLowerCase() ===
      roleName.toLowerCase()
  );

  if (existingRole) {
    return {
      role: null,
      error: 'This role is already occupied.',
    };
  }

  const createdRole = createRole({
    firstName,
    lastName,
    role: roleName,
  });

  if (!createdRole) {
    return {
      role: null,
      error: 'This role is already occupied.',
    };
  }

  return {
    role: createdRole,
    error: '',
  };
}

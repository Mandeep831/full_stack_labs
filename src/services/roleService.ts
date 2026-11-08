
import type { Role } from '../../shared/types/Role';
import { createRole, getRoles } from '../apis/roleRepo';

export async function addRole(newRole: Role): Promise<{
  role: Role | null;
  error: string;
}> {
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

  try {
    const existingRoles = await getRoles();

    const existingRole = existingRoles.some(
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

    const createdRole = await createRole({
      firstName,
      lastName,
      role: roleName,
    });

    return {
      role: createdRole,
      error: '',
    };
  } catch (error) {
    return {
      role: null,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to create role.',
    };
  }
}

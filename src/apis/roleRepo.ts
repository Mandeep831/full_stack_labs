
import type { Role } from '../../shared/types/Role';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getRoles(): Promise<Role[]> {
  const response = await fetch(`${API_BASE_URL}/api/roles`);

  if (!response.ok) {
    throw new Error('Failed to fetch roles.');
  }

  return response.json();
}

export async function createRole(newRole: Role): Promise<Role> {
  const response = await fetch(`${API_BASE_URL}/api/roles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRole),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create role.');
  }

  return response.json();
}

export async function updateRole(
  oldRoleName: string,
  updatedRole: Role
): Promise<Role> {
  const response = await fetch(
    `${API_BASE_URL}/api/roles/${encodeURIComponent(oldRoleName)}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRole),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update role.');
  }

  return response.json();
}

export async function deleteRole(roleName: string): Promise<boolean> {
  const response = await fetch(
    `${API_BASE_URL}/api/roles/${encodeURIComponent(roleName)}`,
    {
      method: 'DELETE',
    }
  );

  if (response.status === 404) {
    return false;
  }

  if (!response.ok) {
    throw new Error('Failed to delete role.');
  }

  return true;
}

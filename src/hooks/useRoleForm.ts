
import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Role } from '../interfaces/Role';
import { addRole } from '../services/roleService';

export function useRoleForm(
  onRoleAdded: (role: Role) => void
) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [roleName, setRoleName] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = addRole({
      firstName,
      lastName,
      role: roleName,
    });

    if (result.error || !result.role) {
      setError(result.error);
      return;
    }

    onRoleAdded(result.role);

    setFirstName('');
    setLastName('');
    setRoleName('');
    setError('');
  }

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    roleName,
    setRoleName,
    error,
    handleSubmit,
  };
}

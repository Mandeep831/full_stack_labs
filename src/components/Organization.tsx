
import { useState } from 'react';
import type { Role } from '../interfaces/Role';
import { getRoles } from '../apis/roleRepo';
import AddRole from './AddRole';

function Organization() {
  const [roles, setRoles] = useState<Role[]>(() => getRoles());

  function handleRoleAdded(newRole: Role) {
    setRoles((currentRoles) => [...currentRoles, newRole]);
  }

  return (
    <section>
      <h2>Organization</h2>
      <p>Leadership and Management</p>

      <AddRole onRoleAdded={handleRoleAdded} />

      <table style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th style={{ textAlign: 'left' }}>Role</th>
          </tr>
        </thead>

        <tbody>
          {roles.map((person) => (
            <tr key={`${person.firstName}-${person.lastName}-${person.role}`}>
              <td>
                {person.firstName} {person.lastName}
              </td>
              <td>{person.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Organization;

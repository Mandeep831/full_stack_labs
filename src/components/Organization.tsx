import { useEffect, useState } from 'react';
import type { Role } from '../../shared/types/Role';
import { getRoles } from '../apis/roleRepo';
import AddRole from './AddRole';

function Organization() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadRoles() {
      try {
        const data = await getRoles();

        if (active) {
          setRoles(data);
        }
      } catch {
        if (active) {
          setError('Failed to load roles.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadRoles();

    return () => {
      active = false;
    };
  }, []);

  function handleRoleAdded(newRole: Role) {
    setRoles((currentRoles) => [...currentRoles, newRole]);
  }

  return (
    <section>
      <h2>Organization</h2>
      <p>Leadership and Management</p>

      <AddRole onRoleAdded={handleRoleAdded} />

      {loading && <p>Loading roles...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <table style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Name</th>
              <th style={{ textAlign: 'left' }}>Role</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((person) => (
              <tr
                key={`${person.firstName}-${person.lastName}-${person.role}`}
              >
                <td>
                  {person.firstName} {person.lastName}
                </td>
                <td>{person.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Organization;

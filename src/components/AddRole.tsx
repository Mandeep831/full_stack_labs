
import type { Role } from '../../shared/types/Role';
import { useRoleForm } from '../hooks/useRoleForm';

interface AddRoleProps {
  onRoleAdded: (role: Role) => void;
}

function AddRole({ onRoleAdded }: AddRoleProps) {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    roleName,
    setRoleName,
    error,
    handleSubmit,
  } = useRoleForm(onRoleAdded);

  return (
    <section>
      <h3>Add a Role</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="roleName">Role</label>
          <input
            id="roleName"
            type="text"
            value={roleName}
            onChange={(event) => setRoleName(event.target.value)}
            required
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit">Add Role</button>
      </form>
    </section>
  );
}

export default AddRole;

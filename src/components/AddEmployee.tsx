
import type { FormEvent } from 'react';
import type { Department } from '../../shared/types/Department';
import type { Employee } from '../../shared/types/Employee';
import useFormInput from '../hooks/useformInput';
import { addEmployee } from '../services/employeeService';

interface AddEmployeeProps {
  departments: Department[];
  onEmployeeAdded: () => void;
}

function AddEmployee({ departments, onEmployeeAdded }: AddEmployeeProps) {
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const departmentName = useFormInput('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const employee: Employee = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
    };

    const error = await addEmployee(departmentName.value, employee);

    if (error) {
      if (error.includes('First Name')) {
        firstName.validate(() => error);
      } else if (error.includes('Last Name')) {
        lastName.validate(() => error);
      } else {
        departmentName.validate(() => error);
      }
      return;
    }

    firstName.setValue('');
    lastName.setValue('');
    departmentName.setValue('');

    firstName.validate(() => null);
    lastName.validate(() => null);
    departmentName.validate(() => null);

    onEmployeeAdded();
  }

  return (
    <section>
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            value={firstName.value}
            onChange={(event) => firstName.setValue(event.target.value)}
          />
          {firstName.message && <p>{firstName.message}</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            value={lastName.value}
            onChange={(event) => lastName.setValue(event.target.value)}
          />
          {lastName.message && <p>{lastName.message}</p>}
        </div>

        <div>
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            value={departmentName.value}
            onChange={(event) => departmentName.setValue(event.target.value)}
          >
            <option value="">Select a department</option>
            {departments.map((department) => (
              <option key={department.name} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
          {departmentName.message && <p>{departmentName.message}</p>}
        </div>

        <button type="submit">Add Employee</button>
      </form>
    </section>
  );
}

export default AddEmployee;

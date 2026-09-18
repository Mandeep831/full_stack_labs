import { useState, type Dispatch, type SetStateAction } from 'react';
import type { Department } from '../interfaces/Department';

interface AddEmployeeProps {
  departments: Department[];
  setDepartments: Dispatch<SetStateAction<Department[]>>;
}

function AddEmployee({ departments, setDepartments }: AddEmployeeProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Clear previous validation messages
    setError('');

    // Validate first name
    if (firstName.trim().length < 3) {
      setError('First Name must be at least 3 characters long.');
      return;
    }

    // Validate department
    if (!departmentName) {
      setError('Please select a department.');
      return;
    }

    // Check that the selected department exists
    const departmentExists = departments.some(
      (department) => department.name === departmentName
    );

    if (!departmentExists) {
      setError('Please select an existing department.');
      return;
    }

    // Add the new employee to the selected department
    setDepartments((currentDepartments) =>
      currentDepartments.map((department) => {
        if (department.name === departmentName) {
          return {
            ...department,
            employees: [
              ...department.employees,
              {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
              },
            ],
          };
        }

        return department;
      })
    );

    // Clear the form after successful submission
    setFirstName('');
    setLastName('');
    setDepartmentName('');
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
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            value={departmentName}
            onChange={(event) => setDepartmentName(event.target.value)}
          >
            <option value="">Select a department</option>

            {departments.map((department) => (
              <option key={department.name} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Add Employee</button>
      </form>
    </section>
  );
}

export default AddEmployee;
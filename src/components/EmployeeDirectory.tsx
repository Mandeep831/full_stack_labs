import type { Department } from '../interfaces/Department';

interface EmployeeDirectoryProps {
  departments: Department[];
}

function EmployeeDirectory({ departments }: EmployeeDirectoryProps) {
  return (
    <section>
      <h2>Employees and Departments</h2>
      <p>Below is a list of employees organized by their department.</p>

      <div id="employee-directory">
        {departments.map((department) => (
          <section key={department.name}>
            <h2>{department.name}</h2>

            <ul>
              {department.employees.map((employee) => (
                <li key={`${employee.firstName}-${employee.lastName}`}>
                  {employee.firstName} {employee.lastName}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}

export default EmployeeDirectory;
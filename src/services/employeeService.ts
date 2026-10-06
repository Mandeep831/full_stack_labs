import type { Employee } from '../interfaces/Employee';
import {
  createEmployee,
  getDepartments,
} from '../apis/employeeRepo';

export function addEmployee(
  departmentName: string,
  employee: Employee
): string | null {
  const departments = getDepartments();

  const departmentExists = departments.some(
    (department) => department.name === departmentName
  );

  if (!departmentExists) {
    return 'Please select an existing department.';
  }

  if (employee.firstName.trim().length < 3) {
    return 'First Name must be at least 3 characters long.';
  }

  createEmployee(departmentName, {
    firstName: employee.firstName.trim(),
    lastName: employee.lastName.trim(),
  });

  return null;
}
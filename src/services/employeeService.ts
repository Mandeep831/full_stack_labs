
import type { Employee } from '../../shared/types/Employee';
import {
  createEmployee,
  getDepartments,
} from '../apis/employeeRepo';

export async function addEmployee(
  departmentName: string,
  employee: Employee
): Promise<string | null> {
  const departments = await getDepartments();

  const departmentExists = departments.some(
    (department) => department.name === departmentName
  );

  if (!departmentExists) {
    return 'Please select an existing department.';
  }

  if (employee.firstName.trim().length < 3) {
    return 'First Name must be at least 3 characters long.';
  }

  if (!employee.lastName.trim()) {
    return 'Last Name is required.';
  }

  try {
    await createEmployee(departmentName, {
      firstName: employee.firstName.trim(),
      lastName: employee.lastName.trim(),
    });

    return null;
  } catch (error) {
    return error instanceof Error
      ? error.message
      : 'Failed to create employee.';
  }
}


import type { Employee } from "../../../shared/types/Employee.js" with {
  "resolution-mode": "import",
};

import {
  getDepartments,
  getEmployees,
  createEmployee,
  deleteEmployee,
} from "../repositories/employeeRepository";

export async function getAllDepartments() {
  return getDepartments();
}

export async function getAllEmployees(departmentName?: string) {
  return getEmployees(departmentName);
}

export async function addEmployee(
  departmentName: string,
  employee: Employee
): Promise<Employee | string> {
  const departments = await getDepartments();

  const departmentExists = departments.some(
    (department) => department.name === departmentName
  );

  if (!departmentExists) {
    return "Please select an existing department.";
  }

  if (employee.firstName.trim().length < 3) {
    return "First Name must be at least 3 characters long.";
  }

  if (!employee.lastName.trim()) {
    return "Last Name is required.";
  }

  return createEmployee(departmentName, {
    firstName: employee.firstName.trim(),
    lastName: employee.lastName.trim(),
  }) as Promise<Employee>;
}

export async function removeEmployee(
  departmentName: string,
  firstName: string,
  lastName: string
): Promise<boolean> {
  return deleteEmployee(departmentName, firstName, lastName);
}
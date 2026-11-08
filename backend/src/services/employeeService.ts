import type { Employee } from "../../../shared/types/Employee.js" with {
  "resolution-mode": "import",
};

import {
  getDepartments,
  getEmployees,
  createEmployee,
} from "../repositories/employeeRepository";

export function getAllDepartments() {
  return getDepartments();
}

export function getAllEmployees(departmentName?: string) {
  return getEmployees(departmentName);
}

export function addEmployee(
  departmentName: string,
  employee: Employee
): Employee | string {
  const departmentExists = getDepartments().some(
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
  })!;
}
import type { Employee } from "../../../shared/types/Employee.js" with {
  "resolution-mode": "import",
};

import type { Role } from "../../../shared/types/Role.js" with {
  "resolution-mode": "import",
};

export function validateEmployee(body: unknown): string | null {
  if (!body || typeof body !== "object") {
    return "Invalid employee request.";
  }

  const data = body as {
    departmentName?: unknown;
    employee?: Partial<Employee>;
  };

  if (
    typeof data.departmentName !== "string" ||
    !data.departmentName.trim()
  ) {
    return "Department name is required.";
  }

  if (!data.employee || typeof data.employee !== "object") {
    return "Employee details are required.";
  }

  if (
    typeof data.employee.firstName !== "string" ||
    data.employee.firstName.trim().length < 3
  ) {
    return "First name must be at least 3 characters long.";
  }

  if (
    typeof data.employee.lastName !== "string" ||
    !data.employee.lastName.trim()
  ) {
    return "Last name is required.";
  }

  return null;
}

export function validateRole(body: unknown): string | null {
  if (!body || typeof body !== "object") {
    return "Invalid role request.";
  }

  const data = body as Partial<Role>;

  if (
    typeof data.firstName !== "string" ||
    data.firstName.trim().length < 3
  ) {
    return "First name must be at least 3 characters long.";
  }

  if (
    typeof data.lastName !== "string" ||
    !data.lastName.trim()
  ) {
    return "Last name is required.";
  }

  if (
    typeof data.role !== "string" ||
    !data.role.trim()
  ) {
    return "Role is required.";
  }

  return null;
}
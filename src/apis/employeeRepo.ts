import type { Department } from '../interfaces/Department';
import type { Employee } from '../interfaces/Employee';
import { departments } from '../interfaces/Department';

let departmentData: Department[] = departments;

export function getDepartments(): Department[] {
  return departmentData;
}

export function getEmployees(
  departmentName?: string
): Employee[] {
  if (departmentName) {
    const department = departmentData.find(
      (department) => department.name === departmentName
    );

    return department ? department.employees : [];
  }

  return departmentData.flatMap(
    (department) => department.employees
  );
}

export function createEmployee(
  departmentName: string,
  employee: Employee
): Employee | null {
  departmentData = departmentData.map(
    (department) => {
      if (department.name === departmentName) {
        return {
          ...department,
          employees: [
            ...department.employees,
            employee,
          ],
        };
      }

      return department;
    }
  );

  return employee;
}

import type { Department } from '../../shared/types/Department';
import type { Employee } from '../../shared/types/Employee';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getDepartments(): Promise<Department[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/employees/departments`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch departments.');
  }

  return response.json();
}

export async function getEmployees(
  departmentName?: string
): Promise<Employee[]> {
  const url = new URL(`${API_BASE_URL}/api/employees`);

  if (departmentName) {
    url.searchParams.set('departmentName', departmentName);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch employees.');
  }

  return response.json();
}

export async function createEmployee(
  departmentName: string,
  employee: Employee
): Promise<Employee> {
  const response = await fetch(
    `${API_BASE_URL}/api/employees`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        departmentName,
        employee,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create employee.');
  }

  return response.json();
}

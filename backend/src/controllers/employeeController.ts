import type { Request, Response } from "express";

import {
  getAllDepartments,
  getAllEmployees,
  addEmployee,
  removeEmployee, 
} from "../services/employeeService";

export async function getDepartments(
  req: Request,
  res: Response
): Promise<void> {
  const departments = await getAllDepartments();
  res.status(200).json(departments);
}

export async function getEmployees(
  req: Request,
  res: Response
): Promise<void> {
  const departmentName = req.query.departmentName as
    | string
    | undefined;

  const employees = await getAllEmployees(departmentName);
  res.status(200).json(employees);
}

export async function createEmployee(
  req: Request,
  res: Response
): Promise<void> {
  const { departmentName, employee } = req.body;

  const result = await addEmployee(departmentName, employee);

  if (typeof result === "string") {
    res.status(400).json({ message: result });
    return;
  }

  res.status(201).json(result);
}

export async function deleteEmployee(
  req: Request,
  res: Response
): Promise<void> {
  const { departmentName, firstName, lastName } = req.body;

  const deleted = await removeEmployee(
    departmentName,
    firstName,
    lastName
  );

  if (!deleted) {
    res.status(404).json({ message: "Employee not found." });
    return;
  }

  res.status(204).send();
}
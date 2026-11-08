import type { Request, Response } from "express";

import {
  getAllDepartments,
  getAllEmployees,
  addEmployee,
} from "../services/employeeService";

export function getDepartments(
  req: Request,
  res: Response
): void {
  res.status(200).json(getAllDepartments());
}

export function getEmployees(
  req: Request,
  res: Response
): void {
  const departmentName = req.query.departmentName as
    | string
    | undefined;

  res.status(200).json(getAllEmployees(departmentName));
}

export function createEmployee(
  req: Request,
  res: Response
): void {
  const { departmentName, employee } = req.body;

  const result = addEmployee(departmentName, employee);

  if (typeof result === "string") {
    res.status(400).json({ message: result });
    return;
  }

  res.status(201).json(result);
}
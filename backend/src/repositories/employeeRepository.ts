
import prisma from "../lib/prisma";

export async function getDepartments() {
  return prisma.department.findMany({
    include: {
      employees: true,
    },
    orderBy: {
      id: "asc",
    },
  });
}

export async function getEmployees(departmentName?: string) {
  if (departmentName) {
    const department = await prisma.department.findUnique({
      where: {
        name: departmentName,
      },
      include: {
        employees: true,
      },
    });

    return department ? department.employees : [];
  }

  return prisma.employee.findMany({
    where: {
      departmentId: {
        not: null,
      },
    },
    orderBy: {
      id: "asc",
    },
  });
}

export async function createEmployee(
  departmentName: string,
  employee: {
    firstName: string;
    lastName: string;
  }
) {
  const department = await prisma.department.findUnique({
    where: {
      name: departmentName,
    },
  });

  if (!department) {
    return null;
  }

  return prisma.employee.create({
    data: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      departmentId: department.id,
    },
    select: {
      firstName: true,
      lastName: true,
    },
  });
}

export async function deleteEmployee(
  departmentName: string,
  firstName: string,
  lastName: string
) {
  const department = await prisma.department.findUnique({
    where: { name: departmentName },
  });

  if (!department) {
    return false;
  }

  const employee = await prisma.employee.findFirst({
    where: {
      departmentId: department.id,
      firstName,
      lastName,
    },
  });

  if (!employee) {
    return false;
  }

  await prisma.employee.delete({
    where: { id: employee.id },
  });

  return true;
}

import prisma from "../lib/prisma";

type RoleInput = {
  firstName: string;
  lastName: string;
  role: string;
};

export async function getRoles(): Promise<RoleInput[]> {
  const roles = await prisma.role.findMany({
    include: {
      employees: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return roles.flatMap((role) =>
    role.employees.map((employee) => ({
      firstName: employee.firstName,
      lastName: employee.lastName,
      role: role.title,
    }))
  );
}

export async function createRole(newRole: RoleInput) {
  const roleName = newRole.role.trim();

  const existingRole = await prisma.role.findUnique({
    where: { title: roleName },
  });

  if (existingRole) {
    return null;
  }

  await prisma.role.create({
    data: {
      title: roleName,
      employees: {
        create: {
          firstName: newRole.firstName,
          lastName: newRole.lastName,
        },
      },
    },
  });

  return {
    firstName: newRole.firstName,
    lastName: newRole.lastName,
    role: roleName,
  };
}

export async function updateRole(
  oldRoleName: string,
  updatedRole: RoleInput
) {
  const existingRole = await prisma.role.findUnique({
    where: { title: oldRoleName },
  });

  if (!existingRole) {
    return null;
  }

  const newRoleName = updatedRole.role.trim();

  const duplicateRole = await prisma.role.findUnique({
    where: { title: newRoleName },
  });

  if (duplicateRole && duplicateRole.id !== existingRole.id) {
    return null;
  }

  return prisma.$transaction(async (tx) => {
    await tx.role.update({
      where: { id: existingRole.id },
      data: { title: newRoleName },
    });

    await tx.employee.updateMany({
      where: { roleId: existingRole.id },
      data: {
        firstName: updatedRole.firstName,
        lastName: updatedRole.lastName,
      },
    });

    return {
      firstName: updatedRole.firstName,
      lastName: updatedRole.lastName,
      role: newRoleName,
    };
  });
}

export async function deleteRole(roleName: string) {
  const existingRole = await prisma.role.findUnique({
    where: { title: roleName },
  });

  if (!existingRole) {
    return false;
  }

  await prisma.$transaction(async (tx) => {
    await tx.employee.deleteMany({
      where: { roleId: existingRole.id },
    });

    await tx.role.delete({
      where: { id: existingRole.id },
    });
  });

  return true;
}


import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const roleEmployees = [
  { firstName: "Jo-Anne", lastName: "Sinclair", role: "CEO/Chair of Board" },
  { firstName: "Jackson", lastName: "Smith", role: "COO/VP Operations" },
  { firstName: "Susan", lastName: "Thomas", role: "CFO/VP Administration" },
  { firstName: "Richa", lastName: "Kaur", role: "VP Client Services" },
  { firstName: "Josee", lastName: "Benjamin", role: "CIO" },
  { firstName: "Vincent", lastName: "Grey", role: "VP Sales & Marketing" },
  { firstName: "Rupa", lastName: "Kharki", role: "Director Financial and Audit Svcs" },
  { firstName: "Xun", lastName: "Kuang", role: "Director Human Resources" },
  { firstName: "Stien", lastName: "Pedersen", role: "Director Legal Services/General Counsel" },
  { firstName: "Sandra", lastName: "Bear", role: "Director Information Technology" },
  { firstName: "Gus", lastName: "Blue", role: "Director Information Security and CISSO" },
  { firstName: "Sam", lastName: "Kong", role: "Director Accounting" },
  { firstName: "Valentine", lastName: "Smith", role: "Director Physical Security" },
  { firstName: "Mariya", lastName: "Kaperski", role: "Director Facilities" },
  { firstName: "Abd al-Hamid", lastName: "Alami", role: "Manager, Business Continuity and Disaster Recovery" },
  { firstName: "Victoria", lastName: "Gray", role: "Manager, Internal Audit" },
  { firstName: "Cheryl", lastName: "Guru", role: "Chief Architect" },
  { firstName: "Jean", lastName: "Ngoy", role: "Manager, Security Architecture" },
  { firstName: "Kris", lastName: "Gold", role: "Solution Architect, Online Banking" },
  { firstName: "Isaac", lastName: "Smith", role: "Manager, Application Solutions" },
  { firstName: "Payton", lastName: "Frost", role: "Lead Developer, Online Banking" },
  { firstName: "Samantha", lastName: "Nettle", role: "Manager, Operational Risk" },
  { firstName: "Yolanda", lastName: "Ferreira", role: "Manager, Vendor Relations" },
  { firstName: "Samir", lastName: "Hassan", role: "Manager, Purchasing" },
  { firstName: "Yuna", lastName: "Aikawa", role: "Manager, Communications" },
  { firstName: "Jonathan", lastName: "Carberry", role: "Manager Customer Experience and Community Eng." },
  { firstName: "Roland", lastName: "Wei", role: "Manager of Sales" },
  { firstName: "Pran", lastName: "Singh", role: "Manager, Marketing" },
];

const departments = [
  {
    name: "Administration",
    employees: [
      { firstName: "Zoë", lastName: "Robins" },
      { firstName: "Madeleine", lastName: "Madden" },
    ],
  },
  {
    name: "Audit",
    employees: [
      { firstName: "Josha", lastName: "Sadowski" },
      { firstName: "Kate", lastName: "Fleetwood" },
    ],
  },
  {
    name: "Banking Operations",
    employees: [
      { firstName: "Priyanka", lastName: "Bose" },
      { firstName: "Hammed", lastName: "Animashaun" },
      { firstName: "Álvaro", lastName: "Morte" },
      { firstName: "Taylor", lastName: "Napier" },
      { firstName: "Alan", lastName: "Simmonds" },
    ],
  },
  {
    name: "Communications",
    employees: [
      { firstName: "Gil", lastName: "Cardinal" },
      { firstName: "Richard J.", lastName: "Lewis" },
    ],
  },
  {
    name: "Corporate Services",
    employees: [
      { firstName: "Randy", lastName: "Bradshaw" },
      { firstName: "Tracey", lastName: "Cook" },
      { firstName: "Lubomir", lastName: "Mykytiuk" },
    ],
  },
  {
    name: "Facilities",
    employees: [
      { firstName: "Dakota", lastName: "House" },
      { firstName: "Lori Lea", lastName: "Okemah" },
      { firstName: "Renae", lastName: "Morrisseau" },
      { firstName: "Rick", lastName: "Belcourt" },
    ],
  },
  {
    name: "Financial Services",
    employees: [
      { firstName: "Selina", lastName: "Hanusa" },
      { firstName: "Buffy", lastName: "Gaudry" },
      { firstName: "Shaneen Ann", lastName: "Fox" },
      { firstName: "Allan", lastName: "Little" },
      { firstName: "Danny", lastName: "Rabbit" },
    ],
  },
  {
    name: "Human Resources",
    employees: [
      { firstName: "Jesse Ed", lastName: "Azure" },
      { firstName: "Stacy", lastName: "Da Silva" },
      { firstName: "Vladimír", lastName: "Valenta" },
      { firstName: "Samone", lastName: "Sayeses-Whitney" },
      { firstName: "Paul", lastName: "Coeur" },
    ],
  },
  {
    name: "Information Technology",
    employees: [
      { firstName: "Graham", lastName: "Greene" },
      { firstName: "Sandika", lastName: "Evergreen" },
      { firstName: "Jennifer", lastName: "Rodriguez (Software Developer)" },
    ],
  },
  {
    name: "IT Technician",
    employees: [
      { firstName: "Aiyana", lastName: "Littlebear" },
      { firstName: "Inara", lastName: "Thunderbird" },
      { firstName: "Kaya", lastName: "Runningbrook" },
      { firstName: "Elara", lastName: "Firehawk" },
      { firstName: "Siona", lastName: "Moonflower" },
      { firstName: "Kaiyu", lastName: "Greywolf" },
      { firstName: "Ayawamat", lastName: "Nightwind" },
      { firstName: "Tala", lastName: "Braveheart" },
      { firstName: "Iniko", lastName: "Stonebear" },
      { firstName: "Onatah", lastName: "Redhawk" },
    ],
  },
];

async function main() {
  // Create or update the 28 unique roles.
  for (const employee of roleEmployees) {
    await prisma.role.upsert({
      where: { title: employee.role },
      update: {},
      create: { title: employee.role },
    });
  }

  // Preserve role-holder employees by deleting only
  // employees assigned to a department.
  await prisma.employee.deleteMany({
    where: { departmentId: { not: null } },
  });

  // Create the 28 role-holder employees.
  for (const employee of roleEmployees) {
    const role = await prisma.role.findUniqueOrThrow({
      where: { title: employee.role },
    });

    const existingEmployee = await prisma.employee.findFirst({
      where: {
        firstName: employee.firstName,
        lastName: employee.lastName,
        roleId: role.id,
        departmentId: null,
      },
    });

    if (!existingEmployee) {
      await prisma.employee.create({
        data: {
          firstName: employee.firstName,
          lastName: employee.lastName,
          roleId: role.id,
        },
      });
    }
  }

  // Create departments and their employees.
  for (const departmentData of departments) {
    const department = await prisma.department.upsert({
      where: { name: departmentData.name },
      update: {},
      create: { name: departmentData.name },
    });

    for (const employee of departmentData.employees) {
      await prisma.employee.create({
        data: {
          firstName: employee.firstName,
          lastName: employee.lastName,
          departmentId: department.id,
        },
      });
    }
  }

  console.log("Seed completed successfully!");
  console.log("28 role-holder employees seeded.");
  console.log("10 departments and their employees seeded.");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "#prisma/client.js";

import { hashPassword } from "#utils/auth-utils.js";
import serviceList from "#seed/services.json" with { type: "json" };
import nonprofitList from "#seed/nonprofits.json" with { type: "json" };
import employees from "#seed/employees.json" with { type: "json" };

const prisma = new PrismaClient();

async function main() {
  // Delete all existing data
  await prisma.service.deleteMany();
  await prisma.nonprofit_employee.deleteMany();
  await prisma.nonprofit.deleteMany();

  // Assign services to nonprofits
  const serviceDistribution = [20, 10, 5, 5]; // How to distribute services to nonprofits
  // Make sure the full length of services is assigned
  const serviceDistributionLength = serviceDistribution.length;
  serviceDistribution[serviceDistributionLength-1] = serviceList.length - serviceDistribution.slice(0,serviceDistributionLength-1).reduce((acc, val) => acc + val, 0);
  // The start and end indices of each nonprofit's slice of services
  const serviceDistroStart = serviceDistribution.map((val,num)=> serviceDistribution.slice(0, num).reduce((acc, val) => acc + val, 0));
  const serviceDistroEnd = serviceDistribution.map((val,num)=> serviceDistroStart[num]+serviceDistribution[num]);

  // Assign employees to nonprofits
  let employeeList = await Promise.all(employees.map(async (employee) => {
    let passwordHash = await hashPassword(employee.password);
    return {...employee, password: passwordHash}})) // Hash the passwords
  const employeeDistribution = [10, 15, 10, 5]; // How to distribute employees to nonprofits
  const employeeDistributionLength = employeeDistribution.length;
  // Make sure the full length of employees is assigned
  employeeDistribution[employeeDistributionLength-1] = employees.length - employeeDistribution.slice(0,employeeDistributionLength-1).reduce((acc, val) => acc + val, 0);
    // The start and end indices of each nonprofit's slice of services
  const employeeDistroStart = employeeDistribution.map((val,num)=> employeeDistribution.slice(0, num).reduce((acc, val) => acc + val, 0));
  const employeeDistroEnd = employeeDistribution.map((val,num)=> employeeDistroStart[num]+employeeDistribution[num]);

  // Create nonprofits with services and employees
  let nonprofitlist = nonprofitList.map((nonprofit, num) => ({
    ...nonprofit,
    services:
      serviceList.slice(
        serviceDistroStart[num],
        serviceDistroEnd[num]
      ),
    employees: employeeList.slice(employeeDistroStart[num], employeeDistroEnd[num]),
  }));

  // Create nonprofits and adds to database
  const nonprofits = await Promise.all(
    nonprofitlist.map(async (profitInfo) => {
      await prisma.nonprofit.create({
        data: {
          ...profitInfo,
          services:profitInfo.services? {create: profitInfo.services}:undefined,
          employees:profitInfo.employees? {create: profitInfo.employees}:undefined,
        },
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

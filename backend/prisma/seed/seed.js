import { PrismaClient } from "#prisma/client.js";

import { hashPassword } from "#utils/auth-utils.js";
import serviceList from "#seed/services.json" with { type: "json" };
import nonprofitList from "#seed/nonprofits.json" with { type: "json" };
import employees from "#seed/employees.json" with { type: "json" };

const prisma = new PrismaClient();

async function main() {
  // Delete all existing data
  await deleteAll();

  // Get starting and ending indices for each nonprofit's slice of services
  const serviceDistribution = [20, 10, 5, 5]; // How to distribute services to nonprofits
  let [serviceStart, serviceEnd] = distribute(serviceDistribution, serviceList.length);

  // Get starting and ending indices for each nonprofit's slice of employees
  const employeeDistribution = [10, 15, 10, 5]; // How to distribute employees to nonprofits
  let [employeeStart, employeeEnd] = distribute(employeeDistribution, employees.length);

  // Hash the passwords
  let employeeList = await hashPasswordList(employees); // Hash the passwords

  // Create nonprofits with services and employees
  let nonprofitlist = nonprofitList.map((nonprofit, num) => ({
    ...nonprofit,
    services:
      serviceList.slice(
        serviceStart[num],
        serviceEnd[num]
      ),
    employees: employeeList.slice(employeeStart[num], employeeEnd[num]),
  }));

  // Create nonprofits and adds to database
  await Promise.all(
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

/**
 * Deletes all existing data
 */
async function deleteAll(){
  // Delete all existing data
  await prisma.service.deleteMany();
  await prisma.nonprofit_employee.deleteMany();
  await prisma.nonprofit.deleteMany();
}

/**
 * Hash the passwords of a list of employees
 * @param {object} employees All the employees to hash the passwords of
 * @returns A list of employees with their passwords hashed
 */
async function hashPasswordList(employees){
  return await Promise.all(employees.map(async (employee) => {
    let passwordHash = await hashPassword(employee.password);
    return {...employee, password: passwordHash}})) // Hash the passwords
  }

/**
 * Gives starting and ending indices for each nonprofit's slice of objects from a # per nonprofit
 * @param {Array} arr The number of objects per nonprofit
 * @param Int} maxLength The total length of objects
 * @returns A starting and ending index for each nonprofit's slice of objects
 */
function distribute(arr, maxLength) {
  // Make sure there is an index for each nonprofit
  if( nonprofitList.length > arr.length){
    for (let i = arr.length; i < nonprofitList.length; i++) {
      arr.push(0);
    }
  }else if (nonprofitList.length < arr.length){
    arr = arr.slice(0, nonprofitList.length);
  }

  // Make sure the full length of objects is assigned
  arr[arr.length-1] = maxLength - arr.slice(0,arr.length-1).reduce((acc, val) => acc + val, 0);
  // The start and end indices of each nonprofit's slice of objects
  const startArr = arr.map((val,num)=> arr.slice(0, num).reduce((acc, val) => acc + val, 0));
  const endArr = arr.map((val,num)=> startArr[num]+arr[num]);
  return [startArr, endArr]
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

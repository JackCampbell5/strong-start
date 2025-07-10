// Node Module Imports
import { PrismaClient } from "#prisma/client.js";

// Local Imports
import { hashPassword } from "#utils/auth-utils.js";

// Seed Data to import
import serviceList from "#seed/services.json" with { type: "json" };
import nonprofitList from "#seed/nonprofits.json" with { type: "json" };
import employees from "#seed/employees.json" with { type: "json" };

const prisma = new PrismaClient();

async function main() {
  // Delete all existing data
  await deleteAll();

  // Get starting and ending indices for each nonprofit's slice of services
  const serviceDistribution = [20, 10, 5, 5]; // How to distribute services to nonprofits
  let [serviceStart, serviceEnd] = distribute(serviceDistribution, serviceList.length, nonprofitList.length);

  // Get starting and ending indices for each nonprofit's slice of employees
  const employeeDistribution = [10, 15, 10, 5]; // How to distribute employees to nonprofits
  let [employeeStart, employeeEnd] = distribute(employeeDistribution, employees.length, nonprofitList.length);

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
 *  + If input arrays length is greater than the length of objects then the end is removed from the input array until the size is less
 *  + If the input array is longer than the number of nonprofits then the array is truncated to the number of nonprofits
 *  + If the input array is shorter than the number of nonprofits then the array is padded with 0s
 *  + The last element of the array is set to the max length of objects
 * Example Input: [20, 10, 5, 5]
 * Example Output: [[0,20,30,35], [20,30,35,40]]
 * @param {Array} arr -  The number of objects per nonprofit
 * @param {Int} maxLength - maxLength The total length of objects
 * @returns [Int Array, Int Array] - A starting and ending index for each nonprofit's slice of objects
 */
function distribute(arr, maxLength, nonProfitLength) {
  let arrCopy = [...arr];
  //Make sure the total length of objects is less than the max length
  while (arrCopy.reduce((acc, val) => acc + val, 0) > maxLength) {
    arrCopy.pop();
  }

  // Make sure there is an index for each nonprofit
  if( nonProfitLength > arrCopy.length){
    for (let i = arrCopy.length; i < nonProfitLength; i++) {
      arrCopy.push(0);
    }
  }else if (nonProfitLength < arrCopy.length){
    arrCopy = arrCopy.slice(0, nonProfitLength);
  }


  // Make sure the full length of objects is assigned
  let arrStartTotal = arrCopy.slice(0,-1).reduce((acc, val) => acc + val, 0); // The total length of objects not including the last one
  arrCopy[arrCopy.length-1] = maxLength - arrStartTotal // Makes the last index take the rest of the objects

  // The start and end indices of each nonprofit's slice of objects
  // Create the end array by adding the previous value to the current value
  let endArr = [];
  for (let a = 0; a < arrCopy.length; a++) {
    let newVal = a===0 ? arrCopy[a]: endArr[a-1]+arrCopy[a];
    endArr.push(newVal);
  }
  // Create the start array by adding 0 to the first value and the previous value to the current value
  const startArr = [0, ...endArr.slice(0, -1)]
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

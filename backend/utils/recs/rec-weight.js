import { goalValues, weights, calcResults } from "#recs/rec-constants.js";
/**
 * paramname: {weight:number, max:number}
 * @param {*} rankingInfo
 */
export function calculateWeights(rankingInfo) {
  const rankingInfoValues = Object.values(rankingInfo);
  for (const param in goalValues) {
    // vars
    let paramResults = {};
    const goal = goalValues[param];
    const weight = weights[param];
    // Get the data for this param
    let extractedParam = rankingInfoValues.map((val) => val[param]);
    extractedParam = extractedParam.filter((val) => val !== undefined);
    // Find the average and if less than goal then weight it less
    const paramAverage =
      extractedParam.reduce((a, b) => a + b, 0) / extractedParam.length;
    if (goal > paramAverage) {
      paramResults["weight"] = weight * (paramAverage / goal);
    } else {
      paramResults["weight"] = weight;
    }
    // Find the Max
    const paramMax = Math.max(...extractedParam);
    paramResults["max"] = paramMax;

    // Add to the results
    if (param in calcResults.left) calcResults.left[param] = paramResults;
    else calcResults.right[param] = paramResults;
  }
  // TODO normalize the weights to 100
  return calcResults;
}

/**
 *
 * @param {Array} servicesGiven - All the services given
 * @param {object} rankingInfo - The ranking totals gotten from each service
 * @param {object} calcResults - The results from the calculation of the weights
 * @returns
 */
export function weighServices(servicesGiven, rankingInfo, calcResults) {
  let weightedServices = []; // The services to be returned
  for (const service of servicesGiven) {
    const serviceCounts = rankingInfo[service.id]; // The counts of each param for this service
    // Loop through each side and add the weight
    const leftWeight = weighFromParams(serviceCounts, calcResults.left);
    const rightWeight = weighFromParams(serviceCounts, calcResults.right);
    const serviceWeight = leftWeight * rightWeight;
    weightedServices.push({ ...service, ranking: serviceWeight });
  }
  return weightedServices;
}

/**
 * Weighs the service based on the params given and returns the total weight scored
 * @param {object} serviceCounts - The counts of each param for this service
 * @param {*} weights - The weights for each param in the form of {paramName: {weight:number, max:number}}
 * @returns The total weight calculated for this side
 */
function weighFromParams(serviceCounts, weights) {
  let sideWeight = 0;
  // Loop through each param on this side and add the weight
  for (const param in weights) {
    // If the param is not in the service counts then skip
    if (serviceCounts[param] === undefined) continue;
    const serviceParamCount = serviceCounts[param];
    const weight = weights[param]["weight"];
    const max = weights[param]["max"];
    // If the max is 0 then skip as the calculation will be undefined
    if (max === 0) continue;
    const adjValue = serviceParamCount > max ? max : serviceParamCount;
    sideWeight += (adjValue / max) * weight;
  }
  return sideWeight;
}

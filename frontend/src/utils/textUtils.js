export function formatVarName(varName) {
  let result = varName.replace(/([A-Z])/g, " $1");
  let result2 = result.charAt(0).toUpperCase() + result.slice(1);
  return result2;
}

export function reformatData(data) {
  let result = {};
  for (let a of data) {
    result[a.id] = a.value;
  }
  return result;
}

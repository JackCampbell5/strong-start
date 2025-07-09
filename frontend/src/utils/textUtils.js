export function formatVarName(varName) {
  let result = varName.replace(/([A-Z])/g, " $1");
  let result2 = result.charAt(0).toUpperCase() + result.slice(1);
  return result2;
}

export function reformatData(data) {
  let result = {};
  for (let a of data) {
    if (a.value === "") {
      continue;
    }
    if (a.id === "zipcode") {
      result[a.id] = parseInt(a.value);
    } else if (a.id === "services_offered") {
      result[a.id] = a.value.split(",");
    } else {
      result[a.id] = a.value;
    }
  }
  return result;
}

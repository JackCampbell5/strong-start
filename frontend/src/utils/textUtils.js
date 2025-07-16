export function formatVarName(varName) {
  const result = varName.replace(/([A-Z])/g, " $1");
  const result2 = result.charAt(0).toUpperCase() + result.slice(1);
  return result2;
}

export function reformatData(data) {
  let result = {};
  for (let param of data) {
    if (param.value === "") {
      continue;
    }
    if (param.id === "services_offered") {
      result[param.id] = param.value.split(",");
    } else {
      result[param.id] = param.value;
    }
  }
  return result;
}

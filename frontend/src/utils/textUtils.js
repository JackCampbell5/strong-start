export function formatVarName(varName) {
  const result = varName.replace(/([A-Z])/g, " $1");
  const result2 = result.charAt(0).toUpperCase() + result.slice(1);
  return result2;
}

export function reformatData(data) {
  let result = {};
  for (let a of data) {
    if (a.value === "") {
      continue;
    }
    if (a.id === "services_offered") {
      result[a.id] = a.value.split(",");
    } else {
      result[a.id] = a.value;
    }
  }
  return result;
}

export function formatVarName(varName) {
  let result = varName.replace(/([A-Z])/g, " $1");
  let result2 = result.charAt(0).toUpperCase() + result.slice(1);
  return result2;
}

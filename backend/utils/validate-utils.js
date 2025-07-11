export function validResult(result) {
  return result.valid;
}
export function getResultData(result) {
  return result.data;
}
export function getResultError(result) {
  return result.error;
}
export function errorReturn(error) {
  return { valid: false, error: error.message };
}

export function successReturn(data) {
  return { valid: true, data: data };
}

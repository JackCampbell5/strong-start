export function errorReturn(error) {
  return { valid: false, error: error };
}

export function successReturn(data) {
  return { valid: true, data: data };
}

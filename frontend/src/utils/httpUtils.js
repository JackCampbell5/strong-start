export function errorReturn(error) {
  return { valid: false, error: error.message.message };
}

export function successReturn(data) {
  return { valid: true, data: data };
}

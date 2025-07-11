export class MyHTTPError extends Error {
  constructor(status, message) {
    super(message); // Pass the message to the base Error class
    this.status = status; // Add a custom property
  }
}

export function errorReturn(error) {
  return { valid: false, error: error.message };
}

export function successReturn(data) {
  return { valid: true, data: data };
}

/**
 * Encode the error to be returned as a invalid response
 * @param {string} error - The error to be returned
 * @returns The error object inside a invalid response
 */
export function errorReturn(error) {
  return { valid: false, error: error };
}
/**
 * Encode the data to be returned as a valid response
 * @param {object} data - The data to be returned
 * @returns The data object inside a valid response
 */
export function successReturn(data) {
  return { valid: true, data: data };
}

/**
 * Formats the error message for return to the frontend request
 * @param {Error} err - The error object
 * @returns
 */
export function createErrorReturn(err) {
  return `${err.name}: ${err.message}`;
}

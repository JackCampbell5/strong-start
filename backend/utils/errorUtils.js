/**
 * Formats the error message for return to the frontend request
 * @param {Error} err - The error object
 * @returns
 */
export function createErrorReturn(err) {
  return `${err.name}: ${err.message}`;
}

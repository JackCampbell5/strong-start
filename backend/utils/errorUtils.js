export function createErrorReturn(err) {
  return `${err.name}: ${err.message}`;
}

/**
 * Error to be thrown when the non profit to be changed can not be found
 */
export class ServiceNotFoundError extends Error {
  constructor(message) {
    super(`Id: ${message}`);
    this.name = "ServiceNotFoundError";
    this.statusCode = 400;
  }
}

/**
 * Error to be thrown when the non profit to be created already exists
 */
export class ServiceAlreadyExistsError extends Error {
  constructor(message) {
    super(`Id: ${message}`);
    this.name = "ServiceAlreadyExistsError";
    this.statusCode = 400;
  }
}

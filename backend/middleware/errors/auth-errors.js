/**
 * Error to be thrown when the employee to be changed can not be found
 */
export class PasswordHashFailed extends Error {
  constructor(message) {
    super(`Id: ${message}`);
    this.name = "PasswordHashFailed";
    this.statusCode = 400;
  }
}

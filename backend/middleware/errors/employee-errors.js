import express from "express";

/**
 * Error to be thrown when the employee to be changed can not be found
 */
export class EmployeeNotFoundError extends Error {
  constructor(message) {
    super(`Id: ${message}`);
    this.name = "EmployeeNotFoundError";
    this.statusCode = 400;
  }
}

/**
 * Error to be thrown when the employee to be created already exists
 */
export class EmployeeUsernameTakenError extends Error {
  constructor(message) {
    super(`Username: ${message}`);
    this.name = "EmployeeUsernameTakenError";
    this.statusCode = 400;
  }
}

/**
 * Error to be thrown when the employee has incorrect credentials
 */
export class EmployeeLogInError extends Error {
  constructor(message) {
    super(`Username: ${message}`);
    this.name = "EmployeeLogInError";
    this.statusCode = 400;
  }
}

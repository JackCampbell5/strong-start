import express from "express";

/**
 * Error to be thrown when the non profit to be changed can not be found
 */
export class NonProfitNotFoundError extends Error {
  constructor(message) {
    super(`Id: ${message}`);
    this.name = "NonProfitNotFoundError";
    this.statusCode = 400;
  }
}

/**
 * Error to be thrown when the non profit to be created already exists
 */
export class NonProfitAlreadyExistsError extends Error {
  constructor(message) {
    super(`Id: ${message}`);
    this.name = "NonProfitAlreadyExistsError";
    this.statusCode = 400;
  }
}

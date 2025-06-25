import express from "express";

export class NonProfitNotFoundError extends Error {
  constructor(message) {
    super(`Id: ${message}`);
    this.name = "NonProfitNotFoundError";
    this.statusCode = 400;
  }
}

export class NonProfitAlreadyExistsError extends Error {
  constructor(message) {
    super(`Id: ${message}`);
    this.name = "NonProfitAlreadyExistsError";
    this.statusCode = 400;
  }
}

// Node Module Imports
import argon2 from "argon2";

// Local Imports
import { PasswordHashFailed } from "#errors/auth-errors.js";

/**
 * Hashes the password using argon2id with 64 MB memory cost, 5 iterations, and 1 thread
 * @param {string} plainPassword - The plain text password to hash
 * @returns The hashed password
 */
export async function hashPassword(plainPassword) {
  try {
    const hash = await argon2.hash(plainPassword, {
      type: argon2.argon2id, // Recommended variant
      memoryCost: 2 ** 16, // 64 MB
      timeCost: 5, // Iterations
      parallelism: 1, // Threads
    });
    return hash;
  } catch (err) {
    throw new PasswordHashFailed(err.message);
  }
}

/**
 * Checks if the plain text password matches the hashed password
 * @param {string} plainPassword - The plain text password to verify
 * @param {string} hash - The hashed password to verify
 * @returns
 */
export async function verifyPassword(plainPassword, hash) {
  try {
    return await argon2.verify(hash, plainPassword);
  } catch (err) {
    return false;
  }
}

// Node Module Imports
import { PrismaClient } from "#prisma/client.js";
import multer from "multer"; // File Uploads

// Client to access prisma database
export const prisma = new PrismaClient(); // Universal prisma client for all queries

// File Uploads
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const nonprofitRadius = 50; // Radius in miles to search around the nonprofit
export const googleAPIMaxPageNumber = 3; // Max number of pages returned by Google API search

// Converts google day of week to day of week encoding I am using
export const googleToMeDaysConversion = {
  0: 6,
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
};

// Converts day of week to index
export const dayToIndex = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
};

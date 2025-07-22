/*
  Warnings:

  - Added the required column `results_found` to the `search_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "search_log" ADD COLUMN     "results_found" INTEGER NOT NULL;

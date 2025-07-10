/*
  Warnings:

  - Made the column `zipcode` on table `service` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "service" ALTER COLUMN "zipcode" SET NOT NULL,
ALTER COLUMN "zipcode" SET DATA TYPE TEXT;

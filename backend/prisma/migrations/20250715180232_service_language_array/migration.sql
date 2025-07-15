/*
  Warnings:

  - The `language` column on the `service` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "service" DROP COLUMN "language",
ADD COLUMN     "language" TEXT[];

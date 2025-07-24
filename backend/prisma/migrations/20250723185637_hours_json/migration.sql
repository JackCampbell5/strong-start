/*
  Warnings:

  - The `hours` column on the `service` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "service" DROP COLUMN "hours",
ADD COLUMN     "hours" JSONB[];

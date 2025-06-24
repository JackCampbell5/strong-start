/*
  Warnings:

  - The primary key for the `nonprofit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `nonprofit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `nonprofit_employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `nonprofit_employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `refugee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `refugee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `refugee_log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `refugee_log` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `service` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `nonprofit_ID` on the `nonprofit_employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `nonprofit_ID` on the `refugee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `refugee_ID` on the `refugee_log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `nonprofit_ID` on the `refugee_log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `nonprofit_ID` on the `service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- DropForeignKey
ALTER TABLE "nonprofit_employee" DROP CONSTRAINT "nonprofit_employee_nonprofit_ID_fkey";

-- DropForeignKey
ALTER TABLE "refugee" DROP CONSTRAINT "refugee_nonprofit_ID_fkey";

-- DropForeignKey
ALTER TABLE "refugee_log" DROP CONSTRAINT "refugee_log_nonprofit_ID_fkey";

-- DropForeignKey
ALTER TABLE "refugee_log" DROP CONSTRAINT "refugee_log_refugee_ID_fkey";

-- DropForeignKey
ALTER TABLE "service" DROP CONSTRAINT "service_nonprofit_ID_fkey";

-- AlterTable
ALTER TABLE "nonprofit" DROP CONSTRAINT "nonprofit_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "nonprofit_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "nonprofit_employee" DROP CONSTRAINT "nonprofit_employee_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "nonprofit_ID",
ADD COLUMN     "nonprofit_ID" UUID NOT NULL,
ADD CONSTRAINT "nonprofit_employee_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "refugee" DROP CONSTRAINT "refugee_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "nonprofit_ID",
ADD COLUMN     "nonprofit_ID" UUID NOT NULL,
ADD CONSTRAINT "refugee_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "refugee_log" DROP CONSTRAINT "refugee_log_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "refugee_ID",
ADD COLUMN     "refugee_ID" UUID NOT NULL,
DROP COLUMN "nonprofit_ID",
ADD COLUMN     "nonprofit_ID" UUID NOT NULL,
ADD CONSTRAINT "refugee_log_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "service" DROP CONSTRAINT "service_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "nonprofit_ID",
ADD COLUMN     "nonprofit_ID" UUID NOT NULL,
ADD CONSTRAINT "service_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_nonprofit_ID_fkey" FOREIGN KEY ("nonprofit_ID") REFERENCES "nonprofit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nonprofit_employee" ADD CONSTRAINT "nonprofit_employee_nonprofit_ID_fkey" FOREIGN KEY ("nonprofit_ID") REFERENCES "nonprofit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refugee" ADD CONSTRAINT "refugee_nonprofit_ID_fkey" FOREIGN KEY ("nonprofit_ID") REFERENCES "nonprofit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refugee_log" ADD CONSTRAINT "refugee_log_refugee_ID_fkey" FOREIGN KEY ("refugee_ID") REFERENCES "refugee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refugee_log" ADD CONSTRAINT "refugee_log_nonprofit_ID_fkey" FOREIGN KEY ("nonprofit_ID") REFERENCES "nonprofit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

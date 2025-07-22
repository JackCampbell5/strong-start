/*
  Warnings:

  - Made the column `refugee_ID` on table `refugee_log` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "refugee_log" DROP CONSTRAINT "refugee_log_refugee_ID_fkey";

-- DropForeignKey
ALTER TABLE "web_log" DROP CONSTRAINT "web_log_service_ID_fkey";

-- AlterTable
ALTER TABLE "refugee_log" ALTER COLUMN "refugee_ID" SET NOT NULL;

-- AlterTable
ALTER TABLE "web_log" ALTER COLUMN "service_ID" DROP NOT NULL;

-- CreateTable
CREATE TABLE "search_log" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "zipcode" TEXT NOT NULL,
    "services_needed" TEXT[],
    "languages" TEXT[],
    "date_needed" TEXT,
    "web_log_ID" UUID NOT NULL,

    CONSTRAINT "search_log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "refugee_log" ADD CONSTRAINT "refugee_log_refugee_ID_fkey" FOREIGN KEY ("refugee_ID") REFERENCES "refugee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "web_log" ADD CONSTRAINT "web_log_service_ID_fkey" FOREIGN KEY ("service_ID") REFERENCES "service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "search_log" ADD CONSTRAINT "search_log_web_log_ID_fkey" FOREIGN KEY ("web_log_ID") REFERENCES "web_log"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

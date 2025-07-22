-- DropForeignKey
ALTER TABLE "refugee_log" DROP CONSTRAINT "refugee_log_refugee_ID_fkey";

-- AlterTable
ALTER TABLE "refugee_log" ALTER COLUMN "refugee_ID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "refugee_log" ADD CONSTRAINT "refugee_log_refugee_ID_fkey" FOREIGN KEY ("refugee_ID") REFERENCES "refugee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

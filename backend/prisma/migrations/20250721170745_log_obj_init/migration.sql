/*
  Warnings:

  - You are about to drop the column `view_count` on the `service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "service" DROP COLUMN "view_count";

-- CreateTable
CREATE TABLE "web_logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "session_token" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_type" INTEGER NOT NULL,
    "page_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "nonprofit_ID" UUID NOT NULL,
    "service_ID" UUID NOT NULL,

    CONSTRAINT "web_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "web_logs" ADD CONSTRAINT "web_logs_nonprofit_ID_fkey" FOREIGN KEY ("nonprofit_ID") REFERENCES "nonprofit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "web_logs" ADD CONSTRAINT "web_logs_service_ID_fkey" FOREIGN KEY ("service_ID") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

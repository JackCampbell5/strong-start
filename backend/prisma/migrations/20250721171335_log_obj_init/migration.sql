/*
  Warnings:

  - You are about to drop the `web_logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "web_logs" DROP CONSTRAINT "web_logs_nonprofit_ID_fkey";

-- DropForeignKey
ALTER TABLE "web_logs" DROP CONSTRAINT "web_logs_service_ID_fkey";

-- DropTable
DROP TABLE "web_logs";

-- CreateTable
CREATE TABLE "web_log" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "session_token" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_type" INTEGER NOT NULL,
    "page_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "nonprofit_ID" UUID NOT NULL,
    "service_ID" UUID NOT NULL,

    CONSTRAINT "web_log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "web_log" ADD CONSTRAINT "web_log_nonprofit_ID_fkey" FOREIGN KEY ("nonprofit_ID") REFERENCES "nonprofit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "web_log" ADD CONSTRAINT "web_log_service_ID_fkey" FOREIGN KEY ("service_ID") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

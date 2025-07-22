/*
  Warnings:

  - A unique constraint covering the columns `[web_log_ID]` on the table `search_log` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "search_log_web_log_ID_key" ON "search_log"("web_log_ID");

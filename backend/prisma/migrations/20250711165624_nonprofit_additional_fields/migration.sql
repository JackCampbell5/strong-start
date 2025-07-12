-- AlterTable
ALTER TABLE "nonprofit" ADD COLUMN     "address" TEXT,
ADD COLUMN     "addressInfo" JSONB,
ADD COLUMN     "website" TEXT;

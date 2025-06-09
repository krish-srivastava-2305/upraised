/*
  Warnings:

  - The values [ACTIVE,INACTIVE] on the enum `GadgetStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GadgetStatus_new" AS ENUM ('AVAILABLE', 'DEPLOYED', 'DESTROYED', 'DECOMMISSIONED');
ALTER TABLE "gadgets" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "gadgets" ALTER COLUMN "status" TYPE "GadgetStatus_new" USING ("status"::text::"GadgetStatus_new");
ALTER TYPE "GadgetStatus" RENAME TO "GadgetStatus_old";
ALTER TYPE "GadgetStatus_new" RENAME TO "GadgetStatus";
DROP TYPE "GadgetStatus_old";
ALTER TABLE "gadgets" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;

-- AlterTable
ALTER TABLE "gadgets" ADD COLUMN     "destructOtp" TEXT NOT NULL DEFAULT '123456',
ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

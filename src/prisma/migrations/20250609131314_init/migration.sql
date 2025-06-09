-- CreateEnum
CREATE TYPE "GadgetStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DESTROYED', 'DECOMMISSIONED');

-- CreateTable
CREATE TABLE "gadgets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "GadgetStatus" NOT NULL DEFAULT 'ACTIVE',
    "destroyedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gadgets_pkey" PRIMARY KEY ("id")
);

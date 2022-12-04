/*
  Warnings:

  - You are about to drop the `CategoryTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Default` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryTransaction" DROP CONSTRAINT "CategoryTransaction_userId_fkey";

-- DropTable
DROP TABLE "CategoryTransaction";

-- DropTable
DROP TABLE "Default";

-- CreateTable
CREATE TABLE "defaults" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "defaults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_transactions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "category_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "defaults_name_key" ON "defaults"("name");

-- AddForeignKey
ALTER TABLE "category_transactions" ADD CONSTRAINT "category_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

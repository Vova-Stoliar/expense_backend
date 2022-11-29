/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "Category" JSONB;

-- DropTable
DROP TABLE "Category";

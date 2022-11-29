/*
  Warnings:

  - You are about to drop the column `Category` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "Category",
ADD COLUMN     "category" JSONB;

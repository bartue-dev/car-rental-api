/*
  Warnings:

  - You are about to drop the column `accountId` on the `SelectedTestimonials` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SelectedTestimonials" DROP CONSTRAINT "SelectedTestimonials_accountId_fkey";

-- AlterTable
ALTER TABLE "SelectedTestimonials" DROP COLUMN "accountId";

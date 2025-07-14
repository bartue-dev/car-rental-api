/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `SelectedTestimonials` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `SelectedTestimonials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SelectedTestimonials" ADD COLUMN     "accountId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SelectedTestimonials_accountId_key" ON "SelectedTestimonials"("accountId");

-- AddForeignKey
ALTER TABLE "SelectedTestimonials" ADD CONSTRAINT "SelectedTestimonials_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "User"("accountId") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `refreshtoken` on the `RefreshToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "refreshtoken",
ADD COLUMN     "refreshToken" TEXT;

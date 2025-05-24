/*
  Warnings:

  - You are about to drop the column `userId` on the `Testimonials` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Testimonials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Testimonials" DROP CONSTRAINT "Testimonials_userId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_userId_fkey";

-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Testimonials" DROP COLUMN "userId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "userId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Customer";

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "User"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonials" ADD CONSTRAINT "Testimonials_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "User"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

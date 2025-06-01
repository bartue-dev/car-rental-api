/*
  Warnings:

  - You are about to drop the column `pickupTime` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `returnTime` on the `Bookings` table. All the data in the column will be lost.
  - Added the required column `pickupDateTime` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returnDateTime` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "pickupTime",
DROP COLUMN "returnTime",
ADD COLUMN     "pickupDateTime" TEXT NOT NULL,
ADD COLUMN     "returnDateTime" TEXT NOT NULL,
ALTER COLUMN "duration" SET DATA TYPE TEXT;

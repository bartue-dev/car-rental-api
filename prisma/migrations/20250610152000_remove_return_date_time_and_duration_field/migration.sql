/*
  Warnings:

  - You are about to drop the column `duration` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `returnDateTime` on the `Bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "duration",
DROP COLUMN "returnDateTime";

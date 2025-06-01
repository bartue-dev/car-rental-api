/*
  Warnings:

  - Changed the type of `pickupTime` on the `Bookings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `returnTime` on the `Bookings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `duration` on the `Bookings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "pickupTime",
ADD COLUMN     "pickupTime" INTEGER NOT NULL,
DROP COLUMN "returnTime",
ADD COLUMN     "returnTime" INTEGER NOT NULL,
DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER NOT NULL;

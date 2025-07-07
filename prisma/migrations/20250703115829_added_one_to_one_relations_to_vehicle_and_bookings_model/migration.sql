/*
  Warnings:

  - A unique constraint covering the columns `[vehicleId]` on the table `Bookings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vehicleId` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "vehicleId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_vehicleId_key" ON "Bookings"("vehicleId");

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("vehicleId") ON DELETE CASCADE ON UPDATE CASCADE;

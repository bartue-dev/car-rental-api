-- CreateTable
CREATE TABLE "Bookings" (
    "bookingId" TEXT NOT NULL,
    "pickupTime" TIMESTAMP(3) NOT NULL,
    "returnTime" TIMESTAMP(3) NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("bookingId")
);

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "User"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

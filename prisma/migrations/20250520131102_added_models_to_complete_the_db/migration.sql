-- CreateTable
CREATE TABLE "Vehicle" (
    "vehicleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("vehicleId")
);

-- CreateTable
CREATE TABLE "Images" (
    "imageId" TEXT NOT NULL,
    "url" TEXT,
    "type" TEXT,
    "vehicleId" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("imageId")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customerId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Testimonials" (
    "testimonialsId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Testimonials_pkey" PRIMARY KEY ("testimonialsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userId_key" ON "Customer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Testimonials_userId_key" ON "Testimonials"("userId");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("vehicleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonials" ADD CONSTRAINT "Testimonials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

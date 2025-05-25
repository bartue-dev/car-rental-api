/*
  Warnings:

  - The primary key for the `Testimonials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `testimonialsId` on the `Testimonials` table. All the data in the column will be lost.
  - The required column `testimonialId` was added to the `Testimonials` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Testimonials" DROP CONSTRAINT "Testimonials_pkey",
DROP COLUMN "testimonialsId",
ADD COLUMN     "testimonialId" TEXT NOT NULL,
ADD CONSTRAINT "Testimonials_pkey" PRIMARY KEY ("testimonialId");

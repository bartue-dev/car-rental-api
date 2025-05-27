/*
  Warnings:

  - Made the column `url` on table `Images` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Images` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Images" ALTER COLUMN "url" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'image';

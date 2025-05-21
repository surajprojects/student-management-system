/*
  Warnings:

  - A unique constraint covering the columns `[instituteName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactNoPrimary]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactNoSecondary]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contactNoPrimary` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNoSecondary` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituteAddress` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituteName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "contactNoPrimary" TEXT NOT NULL,
ADD COLUMN     "contactNoSecondary" TEXT NOT NULL,
ADD COLUMN     "instituteAddress" TEXT NOT NULL,
ADD COLUMN     "instituteName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_instituteName_key" ON "User"("instituteName");

-- CreateIndex
CREATE UNIQUE INDEX "User_contactNoPrimary_key" ON "User"("contactNoPrimary");

-- CreateIndex
CREATE UNIQUE INDEX "User_contactNoSecondary_key" ON "User"("contactNoSecondary");

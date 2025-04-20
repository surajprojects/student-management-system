/*
  Warnings:

  - Changed the type of `totalFees` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "totalFees",
ADD COLUMN     "totalFees" INTEGER NOT NULL;

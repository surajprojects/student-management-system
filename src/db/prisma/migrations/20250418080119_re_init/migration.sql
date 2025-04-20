/*
  Warnings:

  - You are about to drop the column `batch` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `course` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `dueFees` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `paidFees` on the `Student` table. All the data in the column will be lost.
  - Added the required column `batchId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `dob` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "batch",
DROP COLUMN "course",
DROP COLUMN "dueFees",
DROP COLUMN "paidFees",
ADD COLUMN     "batchId" TEXT NOT NULL,
ADD COLUMN     "courseId" TEXT NOT NULL,
DROP COLUMN "dob",
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "mobileNo" SET DATA TYPE TEXT,
ALTER COLUMN "guardianMobileNo" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "Batch";

-- DropEnum
DROP TYPE "Course";

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "fees" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

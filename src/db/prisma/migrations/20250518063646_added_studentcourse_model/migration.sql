/*
  Warnings:

  - You are about to drop the column `batchId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `enrolledOn` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `feesStatus` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `session` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `totalFees` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mobileNo]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guardianMobileNo]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentCourseId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_batchId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_courseId_fkey";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "studentCourseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "batchId",
DROP COLUMN "courseId",
DROP COLUMN "enrolledOn",
DROP COLUMN "feesStatus",
DROP COLUMN "session",
DROP COLUMN "status",
DROP COLUMN "totalFees";

-- CreateTable
CREATE TABLE "StudentCourse" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "enrolledOn" TIMESTAMP(3) NOT NULL,
    "totalFees" INTEGER NOT NULL,
    "session" TEXT NOT NULL,
    "remarks" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "feesStatus" "FeesStatus" NOT NULL DEFAULT 'UNPAID',

    CONSTRAINT "StudentCourse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_mobileNo_key" ON "Student"("mobileNo");

-- CreateIndex
CREATE UNIQUE INDEX "Student_guardianMobileNo_key" ON "Student"("guardianMobileNo");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_studentCourseId_fkey" FOREIGN KEY ("studentCourseId") REFERENCES "StudentCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

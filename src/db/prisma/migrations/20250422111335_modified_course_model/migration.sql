/*
  Warnings:

  - Added the required column `instituteName` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Made the column `session` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "instituteName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "session" SET NOT NULL;

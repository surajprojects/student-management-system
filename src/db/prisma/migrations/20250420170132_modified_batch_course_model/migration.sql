/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Course_name_key";

-- AlterTable
ALTER TABLE "Batch" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ST', 'SC', 'OBC', 'GEN');

-- CreateEnum
CREATE TYPE "Institute" AS ENUM ('SCHOOL', 'COLLEGE', 'UNIVERSITY', 'OTHER', 'NONE');

-- CreateEnum
CREATE TYPE "Course" AS ENUM ('DCA', 'PGDCA', 'TALLY', 'TYPING', 'ENGLISH_TYPING', 'HINDI_TYPING', 'BASIC01', 'BASIC03', 'BASIC06');

-- CreateEnum
CREATE TYPE "Batch" AS ENUM ('B01T7AM', 'B02T8AM', 'B03T9AM', 'B04T10AM', 'B05T11AM', 'B06T3PM', 'B07T4PM', 'B08T5PM', 'B09T6PM');

-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('CASH', 'UPI', 'PHONEPAY', 'GOOGLEPAY');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('ABCID', 'AADHAAR', 'SECONDARY', 'HIGHERSECONDARY', 'GRADUATION', 'POSTGRADUATION', 'OTHER');

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "category" "Category" NOT NULL,
    "class" TEXT NOT NULL,
    "institute" "Institute" NOT NULL,
    "instituteName" TEXT,
    "mobileNo" INTEGER NOT NULL,
    "guardianMobileNo" INTEGER NOT NULL,
    "email" TEXT,
    "address" TEXT NOT NULL,
    "course" "Course" NOT NULL,
    "enrolledOn" TIMESTAMP(3) NOT NULL,
    "totalFees" INTEGER NOT NULL,
    "paidFees" INTEGER NOT NULL,
    "dueFees" INTEGER NOT NULL,
    "batch" "Batch" NOT NULL,
    "session" TEXT,
    "photo" TEXT,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "method" "PaymentMode" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentDocument" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "documentName" TEXT,
    "institute" "Institute" NOT NULL,
    "instituteName" TEXT,
    "idNo" TEXT,
    "rollNo" TEXT,
    "enrollmentNo" TEXT,
    "passingSession" TEXT,
    "obtainedMarks" INTEGER,
    "totalMarks" INTEGER,
    "documentLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentDocument" ADD CONSTRAINT "StudentDocument_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

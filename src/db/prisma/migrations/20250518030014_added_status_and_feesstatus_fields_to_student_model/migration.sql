-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'COMPLETED', 'DROPPED', 'ONHOLD', 'TERMINATED');

-- CreateEnum
CREATE TYPE "FeesStatus" AS ENUM ('PAID', 'PARTIAL', 'UNPAID');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "feesStatus" "FeesStatus" NOT NULL DEFAULT 'UNPAID',
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

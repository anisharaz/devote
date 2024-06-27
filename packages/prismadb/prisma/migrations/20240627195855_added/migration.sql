-- CreateEnum
CREATE TYPE "identity"."VerificationStatus" AS ENUM ('PENDING', 'APPROVED');

-- AlterTable
ALTER TABLE "identity"."voters" ADD COLUMN     "verification" "identity"."VerificationStatus" NOT NULL DEFAULT 'PENDING';

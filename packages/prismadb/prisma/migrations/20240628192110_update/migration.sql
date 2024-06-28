-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "identity";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "verification";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "voting";

-- CreateEnum
CREATE TYPE "identity"."VerificationStatus" AS ENUM ('PENDING', 'APPROVED');

-- CreateTable
CREATE TABLE "identity"."admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "identity"."voters" (
    "voterid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "aadhar" TEXT NOT NULL,
    "streetaddress" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "identitycert" TEXT NOT NULL,
    "identityjwt" TEXT NOT NULL,
    "walletaddress" TEXT,
    "verification" "identity"."VerificationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "voters_pkey" PRIMARY KEY ("voterid")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "identity"."admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "voters_email_key" ON "identity"."voters"("email");

-- CreateIndex
CREATE UNIQUE INDEX "voters_phone_key" ON "identity"."voters"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "voters_aadhar_key" ON "identity"."voters"("aadhar");

-- CreateIndex
CREATE UNIQUE INDEX "voters_identitycert_key" ON "identity"."voters"("identitycert");

-- CreateIndex
CREATE UNIQUE INDEX "voters_identityjwt_key" ON "identity"."voters"("identityjwt");

-- CreateIndex
CREATE UNIQUE INDEX "voters_walletaddress_key" ON "identity"."voters"("walletaddress");

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "identity";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "verification";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "voting";

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
    "dob" TIMESTAMP(3) NOT NULL,
    "streetaddress" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "identitycert" TEXT NOT NULL,
    "identityjwt" TEXT NOT NULL,

    CONSTRAINT "voters_pkey" PRIMARY KEY ("voterid")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "identity"."admin"("email");
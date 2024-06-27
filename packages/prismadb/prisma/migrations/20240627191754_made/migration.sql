/*
  Warnings:

  - A unique constraint covering the columns `[walletaddress]` on the table `voters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "voters_walletaddress_key" ON "identity"."voters"("walletaddress");

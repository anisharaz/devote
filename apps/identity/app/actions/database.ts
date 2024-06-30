"use server";
import { prisma } from "@repo/prismadb";
import Jwt from "jsonwebtoken";
import {
  generateDigitalSignature,
  validateDigitalSignature,
} from "../lib/functions";

type VoterData = {
  name: string;
  email: string;
  phone: string;
  aadhar: string;
  streetaddress: string;
  pincode: string;
  state: string;
  city: string;
};

export async function CreateVoter(VoderData: VoterData) {
  const voterJwt = Jwt.sign(
    {
      name: VoderData.name,
      email: VoderData.email,
      phone: VoderData.phone,
      aadhar: VoderData.aadhar,
      streetaddress: VoderData.streetaddress,
      pincode: VoderData.pincode,
      state: VoderData.state,
      city: VoderData.city,
    },
    process.env.ID_AUTHORITY_PUBLIC_KEY as string
  );
  const IdentityCertificate = generateDigitalSignature(voterJwt);
  try {
    const voter = await prisma.voters.create({
      data: {
        name: VoderData.name,
        email: VoderData.email,
        phone: VoderData.phone,
        aadhar: VoderData.aadhar,
        streetaddress: VoderData.streetaddress,
        pincode: VoderData.pincode,
        state: VoderData.state,
        city: VoderData.city,
        identitycert: IdentityCertificate,
        identityjwt: voterJwt,
      },
    });
    return Promise.resolve({
      success: true,
      msg: "Voter Created Successfully",
    });
  } catch (error) {
    return Promise.resolve({
      success: false,
      msg: "Voter Already Exist",
    });
  }
}

export async function GetVoter(PublicKey: string) {
  const user = await prisma.voters.findUnique({
    where: {
      walletaddress: PublicKey,
    },
  });
  return user;
}

export async function GetIdentityCert(aadhar: string) {
  const voter = await prisma.voters.findUnique({
    where: {
      aadhar: aadhar,
    },
  });
  if (voter) {
    return Promise.resolve(voter.identitycert);
  }
  return Promise.resolve(null);
}

export async function VerifyVoter({
  Certificate,
  PublicKey,
  Aadhar,
}: {
  Certificate: string;
  PublicKey: string;
  Aadhar: string;
}) {
  const voter = await prisma.voters.findUnique({
    where: {
      aadhar: Aadhar,
    },
    select: {
      identityjwt: true,
    },
  });
  if (!voter) {
    return Promise.resolve({
      success: false,
      msg: "Invalid Aadhar",
      VotingCertificate: "",
    });
  }
  const certverify: boolean = validateDigitalSignature(
    voter.identityjwt,
    Certificate
  );
  if (!certverify) {
    return Promise.resolve({
      success: false,
      msg: "Invalid Certificate",
      VotingCertificate: "",
    });
  }
  const user = await prisma.voters.update({
    where: {
      aadhar: Aadhar,
    },
    data: {
      walletaddress: PublicKey,
      verification: "APPROVED",
    },
  });

  const VotingCertificate = generateDigitalSignature(JSON.stringify(user));

  return Promise.resolve({
    success: true,
    msg: "Voter Verified",
    VotingCertificate: VotingCertificate,
  });
}

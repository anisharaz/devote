"use server";
import { prisma } from "@repo/prismadb";
import Jwt from "jsonwebtoken";
import {
  generateDigitalSignature,
  validateDigitalSignature,
} from "../lib/functions";
import { GetTokenBalance, SendVotingToken } from "../lib/solana";

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

  const tokens = await GetTokenBalance({
    publickey: PublicKey,
    MintAddress: process.env.TOKEN_MINT as string,
    decimals: "1000000000",
  });
  if (tokens > 0) {
    return Promise.resolve({
      success: false,
      msg: "Voter Already Have Verified and has voting tokens",
      VotingCertificate: "",
    });
  }
  const res = await SendVotingToken({
    publicKey: PublicKey,
    amount: "1",
  });
  if (!res.success) {
    return Promise.resolve({
      success: false,
      msg: "Token Transection Failed Try Again After Some time",
      VotingCertificate: "",
    });
  }
  const updateuser = await prisma.voters.update({
    where: {
      aadhar: Aadhar,
    },
    data: {
      votingcert: VotingCertificate,
    },
  });

  return Promise.resolve({
    success: true,
    msg: "Voter Verified",
    VotingCertificate: VotingCertificate,
  });
}

export async function VerifyVotingCert(signature: string) {
  let voter = await prisma.voters.findUnique({
    where: {
      votingcert: signature,
    },
  });
  if (!voter) {
    return Promise.resolve(false);
  }
  voter = Object.assign({}, voter, { votingcert: null });
  const votingcertverify: boolean = validateDigitalSignature(
    JSON.stringify(voter),
    signature
  );
  if (votingcertverify) {
    return Promise.resolve(true);
  } else {
    return Promise.resolve(false);
  }
}

export async function RegisterCandidate(candidateData: {
  name: string;
  statement: string;
  image: string;
  levelId: string;
  WalletAddress: string;
}) {
  try {
    const res = await prisma.candidates.create({
      data: {
        name: candidateData.name,
        statement: candidateData.statement,
        image: candidateData.image,
        levelId: candidateData.levelId,
        WalletAddress: candidateData.WalletAddress,
      },
    });
    return Promise.resolve({
      success: true,
      msg: "Candidate Registered Successfully",
    });
  } catch (error) {
    return Promise.resolve({
      success: false,
      msg: "Candidate Already Exist",
    });
  }
}

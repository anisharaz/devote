"use server";
import { prisma } from "@repo/prismadb";
import Jwt from "jsonwebtoken";
import {
  generateDigitalSignature,
  validateDigitalSignature,
} from "../lib/functions";
import { conn, GetTokenBalance, SendVotingToken } from "../lib/solana";
import { v4 as uuid } from "uuid";
import {
  SendNormalMail,
  SendRegistrationVerificationMail,
} from "../lib/MailGun";
import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";

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
    const verificationID = uuid();
    if (voter) {
      await prisma.registrationverification.create({
        data: {
          voterid: voter.voterid,
          verificationID: verificationID,
        },
      });
    } else {
      return Promise.resolve({
        success: false,
        msg: "Verification Error with user",
      });
    }
    await SendRegistrationVerificationMail({
      to: VoderData.email,
      href: `${process.env.DEVOTE_DEPLOYMENT_URL as string}/verifyregistration/${verificationID}`,
      firstname: VoderData.name,
    });
    return Promise.resolve({
      success: true,
      msg: "Voter Created Successfully, Verification Mail Sent",
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

export async function GetIdentityCert({
  aadhar,
  publickey,
  signature,
}: {
  aadhar: string;
  publickey: string;
  signature: Uint8Array;
}) {
  const voter = await prisma.voters.findUnique({
    where: {
      aadhar: aadhar,
    },
  });
  if (!voter) {
    return Promise.resolve({
      success: false,
      msg: "Invalid Aadhar",
    });
  }
  const aadharByes = new TextEncoder().encode(aadhar);
  const result = nacl.sign.detached.verify(
    aadharByes,
    // @ts-ignore
    new Uint8Array(signature.data),
    new PublicKey(publickey).toBytes()
  );
  if (!result) {
    return Promise.resolve({
      success: false,
      msg: "Invalid Signature",
    });
  }
  return Promise.resolve({
    success: true,
    msg: voter.identitycert,
  });
}

export async function VerifyVoter({
  Certificate,
  publicKey,
  Aadhar,
  signature,
}: {
  Certificate: string;
  publicKey: string;
  Aadhar: string;
  signature: Uint8Array;
}) {
  const voter = await prisma.voters.findUnique({
    where: {
      aadhar: Aadhar,
    },
  });
  if (!voter) {
    return Promise.resolve({
      success: false,
      msg: "Invalid Aadhar",
      VotingCertificate: "",
    });
  }

  if (voter.hasvoted && !voter.hasvotingtoken) {
    return Promise.resolve({
      success: false,
      msg: "Voter Already Voted",
      VotingCertificate: "",
    });
  }

  const tokens = await GetTokenBalance({
    publickey: publicKey,
    MintAddress: process.env.TOKEN_MINT as string,
  });
  if (tokens > 0 || voter.hasvotingtoken) {
    return Promise.resolve({
      success: false,
      msg: "Voter Already Have Verified and has voting tokens",
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

  const CertificateByes = new TextEncoder().encode(Certificate);
  const result = nacl.sign.detached.verify(
    CertificateByes,
    // @ts-ignore
    new Uint8Array(signature.data),
    new PublicKey(voter.walletaddress as string).toBytes()
  );
  if (!result) {
    return Promise.resolve({
      success: false,
      msg: "Invalid wallet, Use the wallet you used for registration",
      VotingCertificate: "",
    });
  }

  const VotingCertificate = generateDigitalSignature(JSON.stringify(voter));

  const res = await SendVotingToken({
    publicKey: publicKey,
  });
  if (!res.success) {
    return Promise.resolve({
      success: false,
      msg: "Token Transection Failed Try Again After Some time",
      VotingCertificate: "",
    });
  }
  await prisma.voters.update({
    where: {
      aadhar: Aadhar,
    },
    data: {
      votingcert: VotingCertificate,
      votingverification: true,
      hasvotingtoken: true,
    },
  });

  return Promise.resolve({
    success: true,
    msg: "Verification Successfully, Voting token has been sent",
    VotingCertificate: VotingCertificate,
  });
}

export async function VerifyVotingCert(signature: string, publickey: string) {
  let voter = await prisma.voters.findUnique({
    where: {
      votingcert: signature,
    },
  });
  if (!voter) {
    return Promise.resolve({
      success: false,
      msg: "Invalid Certificate",
    });
  }
  if (voter.hasvoted) {
    return Promise.resolve({
      success: false,
      msg: "You have already voted",
    });
  }
  voter = Object.assign({}, voter, {
    votingcert: null,
    votingverification: false,
    hasvotingtoken: false,
  });
  const votingcertverify: boolean = validateDigitalSignature(
    JSON.stringify(voter),
    signature
  );
  if (votingcertverify) {
    if (voter.walletaddress === publickey) {
      return Promise.resolve({
        success: true,
        msg: "Certificate Validation Successfully",
      });
    } else {
      return Promise.resolve({
        success: false,
        msg: "Invalid Wallet connected",
      });
    }
  } else {
    return Promise.resolve({
      success: false,
      msg: "Invalid Certificate",
    });
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
    await prisma.candidates.create({
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

export async function VerifyRegistration({
  verificationID,
  publicKey,
}: {
  verificationID: string;
  publicKey: string;
}) {
  const verification = await prisma.registrationverification.findUnique({
    where: {
      verificationID: verificationID,
    },
    select: {
      voterid: true,
    },
  });
  if (!verification) {
    return Promise.resolve({
      success: false,
      msg: "Invalid Verification ID",
    });
  }
  const user = await prisma.voters.update({
    where: {
      voterid: verification.voterid,
    },
    data: {
      walletaddress: publicKey,
      verification: "APPROVED",
    },
  });
  await prisma.registrationverification.update({
    where: {
      verificationID: verificationID,
    },
    data: {
      verified: true,
    },
  });
  await SendNormalMail({
    to: user.email,
    publickey: publicKey,
  });
  return Promise.resolve({
    success: true,
    msg: "Verification with Wallet Address Successfully",
  });
}

export async function SendVoterVerificationEmail({
  aadhar,
}: {
  aadhar: string;
}) {
  const user = await prisma.voters.findUnique({
    where: { aadhar: aadhar },
    include: {
      registrationverification: true,
    },
  });
  if (!user) {
    return Promise.resolve({
      success: false,
      msg: "Invalid Aadhar",
    });
  }
  if (user.verification === "APPROVED") {
    return Promise.resolve({
      success: false,
      msg: "Voter Already Verified",
    });
  }
  const verificationid = user?.registrationverification?.verificationID;
  await SendRegistrationVerificationMail({
    to: user.email,
    href: `${process.env.DEVOTE_DEPLOYMENT_URL as string}/verifyregistration/${verificationid}`,
    firstname: user.name,
  });
  return Promise.resolve({
    success: true,
    msg: "Verification Email Sent",
  });
}

export async function UpdateVoterVotingStatus({
  txsignature,
  walletaddress,
}: {
  txsignature: string;
  walletaddress: string;
}) {
  let limit = 0;
  while (true) {
    console.log("run " + limit);

    if (limit == 5) {
      break;
    }
    const transaction = await conn.getSignatureStatus(txsignature);
    limit++;
    if (transaction.value?.confirmationStatus === "confirmed") {
      const voter = await prisma.voters.update({
        where: {
          walletaddress: walletaddress,
        },
        data: {
          hasvoted: true,
          hasvotingtoken: false,
        },
      });
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  return;
}

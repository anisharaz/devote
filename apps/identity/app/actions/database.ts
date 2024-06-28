"use server";
import { prisma } from "@repo/prismadb";
import Jwt from "jsonwebtoken";
import { generateDigitalSignature } from "../lib/functions";

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

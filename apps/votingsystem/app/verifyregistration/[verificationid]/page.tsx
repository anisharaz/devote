import WalletConnectPipe from "../../pipes/WalletConnectionPipe";
import WalletPubKey from "./WalletPubKey";
import VerificationAction from "./VerificationAction";
import { prisma } from "@repo/prismadb";
import Link from "next/link";
import { Button } from "@repo/ui";

async function RegistrationVerification({
  params,
}: {
  params: {
    verificationid: string;
  };
}) {
  const verificationIDTruth = await prisma.registrationverification.findUnique({
    where: {
      verificationID: params.verificationid,
    },
  });
  return (
    <>
      {verificationIDTruth ? (
        verificationIDTruth.verified ? (
          <div className="main-body flex justify-center pt-6">
            <div className="flex flex-col gap-6 items-center">
              <div className="text-4xl underline">Already Verified</div>
              <Link href={"/"}>
                <Button>Go Back</Button>
              </Link>
            </div>
          </div>
        ) : (
          <WalletConnectPipe title="Connect Wallet To proceed Verification">
            <div className="main-body flex flex-col gap-6 items-center pt-10">
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">
                  Verify your registration with:
                </h1>
                <div className="text-white">
                  <div>Wallet Address:</div>
                  <WalletPubKey />
                </div>
                <VerificationAction verificationId={params.verificationid} />
              </div>
            </div>
          </WalletConnectPipe>
        )
      ) : (
        <div className="main-body flex pt-6 justify-center">
          <div className="text-white text-6xl underline underline-offset-4">
            Invalid Verification Link
          </div>
        </div>
      )}
    </>
  );
}

export default RegistrationVerification;

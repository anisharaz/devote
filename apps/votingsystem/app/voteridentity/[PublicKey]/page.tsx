import { Button } from "@repo/ui";
import { GetVoter } from "../../actions/database";
import Link from "next/link";
import WalletConnectPipe from "../../pipes/WalletConnectionPipe";

async function MyIdentity({ params }: { params: { PublicKey: string } }) {
  const voter = await GetVoter(params.PublicKey);
  return (
    <WalletConnectPipe title="Connect Wallet To View Identity">
      {!voter ? (
        <div className="main-body flex flex-col items-center p-4 gap-10 text-white">
          <div className="flex flex-col gap-10 p-6 border-2 bg-zinc-800/10 rounded-lg">
            <div className="text-3xl">
              Your are not registered or Verified !
            </div>
            <div>
              <div className="text-2xl py-4 underline underline-offset-8">
                If already registered Verify here
              </div>
              <Link href={"/verify"}>
                <Button size={"lg"} variant={"default"} className="w-full">
                  Verify Here
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="main-body flex justify-center items-center ">
          <div className="border text-lg border-blue-500 bg-slate-200 p-10 flex flex-col gap-4 rounded-3xl">
            <div>
              Voter's ID:
              <span className="underline underline-offset-4">
                {" "}
                {voter.voterid}
              </span>
            </div>
            <div>
              Name:{" "}
              <span className="underline underline-offset-4">{voter.name}</span>
            </div>
            <div>
              Aadhar:
              <span className="underline underline-offset-4">
                {" "}
                {voter.aadhar}
              </span>
            </div>
            <div>
              Phone:
              <span className="underline underline-offset-4">
                {" "}
                {voter.phone}
              </span>
            </div>
            <div>
              Street Address:
              <span className="underline underline-offset-4">
                {" "}
                {voter.streetaddress}
              </span>
            </div>
            <div>
              Pin Code:
              <span className="underline underline-offset-4">
                {" "}
                {voter.pincode}
              </span>
            </div>
            <div>
              City:
              <span className="underline underline-offset-4">
                {" "}
                {voter.city}
              </span>
            </div>
            <div>
              State:
              <span className="underline underline-offset-4">
                {" "}
                {voter.state}
              </span>
            </div>
            <div>
              Email:
              <span className="underline underline-offset-4">
                {" "}
                {voter.email}
              </span>
            </div>
            <div>
              Wallet Address:
              <span className="underline underline-offset-4">
                {" "}
                {voter.walletaddress}
              </span>
            </div>
            <div>
              Verification:
              <span
                className={
                  voter.verification
                    ? "underline p-1 m-1 rounded-xl underline-offset-4 bg-green-400"
                    : ""
                }
              >
                {" "}
                {voter.verification}
              </span>
            </div>
          </div>
        </div>
      )}
    </WalletConnectPipe>
  );
}

export default MyIdentity;

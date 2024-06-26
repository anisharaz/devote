"use client";
import { Button } from "@repo/ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import WalletButton from "./Walletbutton";
import { useVoter } from "../hooks/useVoter";

export function HomePageMainAction() {
  const { connected, publicKey } = useWallet();
  const voter = useVoter();

  return (
    <>
      <Link href={"/voting"}>
        <Button size={"lg"}>Vote A Candidate</Button>
      </Link>
      <Button size={"lg"}>
        <Link href={"/downloadidentity"}>Download ID Certificate</Link>
      </Button>
      {connected ? (
        <div className="flex gap-4">
          <Link href={`/voteridentity/${publicKey}`}>
            <Button size={"lg"} variant={"secondary"}>
              MY Identity
            </Button>
          </Link>
          <div className="h-11 flex items-center text-white text-2xl underline underline-offset-4">
            <div>
              <div className="bg-black p-2 rounded-xl">
                User: {voter.name ? voter.name : "Loading..."}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <WalletButton />
      )}
    </>
  );
}

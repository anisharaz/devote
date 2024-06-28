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
      <Button size={"lg"}>
        <Link href={"URL_TO_VOTE_SYSTEM"}>Vote A Candidate</Link>
      </Button>
      {connected ? (
        <div className="flex gap-4">
          <Button size={"lg"} variant={"secondary"}>
            <Link href={`/voteridentity/${publicKey}`}>MY Identity</Link>
          </Button>
          <div className="h-11 flex items-center text-white text-2xl underline underline-offset-4">
            <div>
              <div>User: {voter.name ? voter.name : "Loading..."}</div>
            </div>
          </div>
        </div>
      ) : (
        <WalletButton />
      )}
    </>
  );
}

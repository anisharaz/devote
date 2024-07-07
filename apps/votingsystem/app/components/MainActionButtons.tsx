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
    <div className="flex flex-col gap-6">
      <div>
        <Link href={"/registrar"}>
          <Button size={"lg"}>Registrar</Button>
        </Link>
      </div>
      {connected ? (
        <div className="flex gap-4">
          <WalletButton />
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
    </div>
  );
}

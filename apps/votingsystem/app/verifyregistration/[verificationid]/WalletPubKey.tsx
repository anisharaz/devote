"use client";

import { useWallet } from "@solana/wallet-adapter-react";

function WalletPubKey() {
  const { publicKey } = useWallet();
  return (
    <div className="underline underline-offset-4 text-xl">
      {publicKey?.toString()}
    </div>
  );
}

export default WalletPubKey;

"use client";
import dynamic from "next/dynamic";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
const WalletProviderDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react")).WalletProvider,
  { ssr: false }
);
const WalletModalProviderDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
  { ssr: false }
);

import { clusterApiUrl } from "@solana/web3.js";

export default function WalletContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const endpoint = clusterApiUrl("devnet");
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProviderDynamic wallets={[]} autoConnect={true}>
        <WalletModalProviderDynamic>{children}</WalletModalProviderDynamic>
      </WalletProviderDynamic>
    </ConnectionProvider>
  );
}

"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletButton from "../../components/Walletbutton";
function WalletConnectChecker({ children }: { children: React.ReactNode }) {
  const { connected } = useWallet();
  return (
    <>
      {connected ? (
        children
      ) : (
        <div className="main-body flex flex-col gap-4 justify-center items-center">
          <div className="text-xl text-white underline underline-offset-8">
            Connect Wallet To get Information !!
          </div>
          <WalletButton />
        </div>
      )}
    </>
  );
}

export default WalletConnectChecker;

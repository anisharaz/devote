"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletButton from "../components/Walletbutton";
function WalletConnectPipe({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const { connected } = useWallet();
  return (
    <>
      {connected ? (
        children
      ) : (
        <div className="main-body flex flex-col gap-4 justify-center items-center">
          <div className="text-4xl text-white underline underline-offset-8">
            {title}
          </div>
          <WalletButton />
        </div>
      )}
    </>
  );
}

export default WalletConnectPipe;
